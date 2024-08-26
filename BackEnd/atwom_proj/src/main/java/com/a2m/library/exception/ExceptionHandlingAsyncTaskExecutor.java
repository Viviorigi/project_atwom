package com.a2m.library.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.task.TaskDecorator;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

public class ExceptionHandlingAsyncTaskExecutor extends ThreadPoolTaskExecutor {

    private static final Logger log = LoggerFactory.getLogger(ExceptionHandlingAsyncTaskExecutor.class);

    public ExceptionHandlingAsyncTaskExecutor(ThreadPoolTaskExecutor executor) {
        this.setCorePoolSize(executor.getCorePoolSize());
        this.setMaxPoolSize(executor.getMaxPoolSize());
        this.setQueueCapacity(executor.getQueueCapacity());
        this.setThreadNamePrefix(executor.getThreadNamePrefix());
        this.initialize();
    }

    @Override
    public void execute(Runnable task) {
        super.execute(wrapRunnable(task));
    }

    private Runnable wrapRunnable(Runnable task) {
        return () -> {
            try {
                task.run();
            } catch (Exception e) {
                handleUncaughtException(e);
            }
        };
    }

    private void handleUncaughtException(Exception e) {
        log.error("Uncaught async error", e);
    }
}


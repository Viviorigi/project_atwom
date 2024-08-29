package com.a2m.library.service.admin.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.a2m.library.model.Checkout;
import com.a2m.library.service.admin.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String from;

	@Override
	public void sendEmail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(from);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

	@Override
	public void SendEmailVerificationUrl(String to, String subject, String verificationUrl) throws MessagingException {
		String htmlContent = "<!DOCTYPE html>" +
			    "<html lang='vi'>" +
			    "<head>" +
			    "<meta charset='UTF-8'>" +
			    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
			    "<title>Xác Thực Email</title>" +
			    "<style>" +
			    "body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }" +
			    ".container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
			    ".header { background-color: #007bff; color: #fff; padding: 20px; text-align: center; }" +
			    ".header h1 { margin: 0; }" +
			    ".content { padding: 20px; text-align: center; }" +
			    ".content p { font-size: 16px; line-height: 1.5; }" +
			    ".btn { display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #007bff; background-color: #fff; border: 2px solid #007bff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s, color 0.3s; }" +
			    ".btn:hover { background-color: #007bff; color: #fff; }" +
			    ".footer { background-color: #f1f1f1; color: #777; padding: 10px; text-align: center; font-size: 14px; }" +
			    "</style>" +
			    "</head>" +
			    "<body>" +
			    "<div class='container'>" +
			    "<div class='header'>" +
			    "<h1>Xác Thực Tài Khoản</h1>" +
			    "</div>" +
			    "<div class='content'>" +
			    "<p>Xin chào,</p>" +
			    "<p>Cảm ơn bạn đã đăng ký. Vui lòng nhấp vào liên kết dưới đây để xác thực địa chỉ email của bạn và hoàn tất việc đăng ký:</p>" +
			    "<a href='" + verificationUrl + "' class='btn'>Xác Thực Email Của Bạn</a>" +
			    "<p>Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.</p>" +
			    "</div>" +
			    "<div class='footer'>" +
			    "<p>&copy; 2024 Thư Viện Atwom. Tất cả quyền được bảo lưu.</p>" +
			    "</div>" +
			    "</div>" +
			    "</body>" +
			    "</html>";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(htmlContent, true); // Set to true to send HTML

		mailSender.send(message);
	}

	@Override
	public void sendPasswordResetRequestEmail(String to, String subject, String resetLink) {
		String htmlContent = "<!DOCTYPE html>" +
			    "<html lang='vi'>" +
			    "<head>" +
			    "<meta charset='UTF-8'>" +
			    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
			    "<title>Yêu Cầu Đặt Lại Mật Khẩu</title>" +
			    "<style>" +
			    "body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }" +
			    ".container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
			    ".header { background-color: #007bff; color: #fff; padding: 20px; text-align: center; }" +
			    ".header h1 { margin: 0; }" +
			    ".content { padding: 20px; text-align: center; }" +
			    ".content p { font-size: 16px; line-height: 1.5; }" +
			    ".btn { display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #007bff; background-color: #fff; border: 2px solid #007bff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s, color 0.3s; }" +
			    ".btn:hover { background-color: #007bff; color: #fff; }" +
			    ".footer { background-color: #f1f1f1; color: #777; padding: 10px; text-align: center; font-size: 14px; }" +
			    "</style>" +
			    "</head>" +
			    "<body>" +
			    "<div class='container'>" +
			    "<div class='header'>" +
			    "<h1>Yêu Cầu Đặt Lại Mật Khẩu</h1>" +
			    "</div>" +
			    "<div class='content'>" +
			    "<p>Xin chào,</p>" +
			    "<p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu của bạn:</p>" +
			    "<a href='" + resetLink + "' class='btn'>Đặt Lại Mật Khẩu</a>" +
			    "<p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>" +
			    "<p>Liên kết này sẽ hết hạn trong 5 phút.</p>" +
			    "</div>" +
			    "<div class='footer'>" +
			    "<p>&copy; 2024 Thư Viện Atwom. Tất cả quyền được bảo lưu.</p>" +
			    "</div>" +
			    "</div>" +
			    "</body>" +
			    "</html>";



		MimeMessage message = mailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(htmlContent, true); // true indicates HTML

			mailSender.send(message);
		} catch (MessagingException e) {
			throw new RuntimeException("Failed to send email", e);
		}
	}

	@Override
	public void sendEmailResponseContact(String to, String subject,String fullName,String resp, String url) throws MessagingException {

		String htmlContent = "<!DOCTYPE html>" +
			    "<html lang='vi'>" +
			    "<head>" +
			    "<meta charset='UTF-8'>" +
			    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
			    "<title>Biểu Mẫu Phản Hồi Tại Thư Viện AtWOM</title>" +
			    "<style>" +
			    "body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }" +
			    ".container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
			    ".header { background-color: #007bff; color: #fff; padding: 20px; text-align: center; }" +
			    ".header h1 { margin: 0; }" +
			    ".content { padding: 20px; text-align: center; }" +
			    ".content p { font-size: 16px; line-height: 1.5; }" +
			    ".btn { display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #007bff; background-color: #fff; border: 2px solid #007bff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s, color 0.3s; }" +
			    ".btn:hover { background-color: #007bff; color: #fff; }" +
			    ".footer { background-color: #f1f1f1; color: #777; padding: 10px; text-align: center; font-size: 14px; }" +
			    "</style>" +
			    "</head>" +
			    "<body>" +
			    "<div class='container'>" +
			    "<div class='header'>" +
			    "<h1>Biểu Mẫu Phản Hồi Thư Viện ATWOM</h1>" +
			    "</div>" +
			    "" +
			    "<p>Xin chào " + fullName.toUpperCase() + "</p>" +
			   
			    "<p>Cảm ơn bạn đã gửi cho chúng tôi một tin nhắn. Vui lòng nhấp vào liên kết dưới đây để truy cập thư viện của chúng tôi:</p>" +
			    "<br><p>Chúng tôi xin phép giải đáp cho bạn như sau:</p> <br>  " +
			    "" + resp +
			    "<a href='" + url + "' class='btn'>Tiếp Tục Vấn Đề</a>" +
			    "<p>Chúc bạn một ngày tốt lành.</p>" +
			    "" +
			    "<div class='footer'>" +
			    "<p>&copy; 2024 Thư Viện Atwom. Tất cả quyền được bảo lưu.</p>" +
			    "</div>" +
			    "</div>" +
			    "</body>" +
			    "</html>";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(htmlContent, true); // Set to true to send HTML

		mailSender.send(message);
	}
	
	@Override
	public void sendEmailCheckoutExpired(String to, String subject,String fullName, Checkout checkout) throws MessagingException {

		String htmlContent = "<!DOCTYPE html>" +
			    "<html lang='vi'>" +
			    "<head>" +
			    "<meta charset='UTF-8'>" +
			    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
			    "<title>Biểu Mẫu Phản Hồi Tại Thư Viện AtWOM</title>" +
			    "<style>" +
			    "body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }" +
			    ".container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
			    ".header { background-color: #007bff; color: #fff; padding: 20px; text-align: center; }" +
			    ".header h1 { margin: 0; }" +
			    ".content { padding: 20px; text-align: center; }" +
			    ".content p { font-size: 16px; line-height: 1.5; }" +
			    ".btn { display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #007bff; background-color: #fff; border: 2px solid #007bff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s, color 0.3s; }" +
			    ".btn:hover { background-color: #007bff; color: #fff; }" +
			    ".footer { background-color: #f1f1f1; color: #777; padding: 10px; text-align: center; font-size: 14px; }" +
			    "</style>" +
			    "</head>" +
			    "<body>" +
			    "<div class='container'>" +
			    "<div class='header'>" +
			    "<h1>Biểu Mẫu Phản Hồi Thư Viện ATWOM</h1>" +
			    "</div>" +
			    "<div class='content'>" +
			    "<p>Xin chào <strong>" + fullName + "</strong>,</p>"
	            + "<p>Đây là thông báo về việc bạn đã quá hạn trả sách cho hệ thống thư viện.</p>"
	            + "<p>Vậy nên chúng tôi muốn bạn phải thanh toán ngay lập tức cho chúng tôi. "
	            + "Tài khoản của bạn cũng sẽ bị cấm nếu bạn không nộp tiền phạt.</p>"
	            + "<p>Dưới đây là thông tin về đơn mượn của bạn:</p>"
	            + "<div style=\"list-style-type: none; padding-left: 0;\">" 
	            + "Mã đơn mượn: " +checkout.getId() + "<br>"
	            + "Ngày mượn sách: "+checkout.getStartTime() + "<br>"
	            + "Hạn trả sách: " + checkout.getEndTime()
	            + "</div>"
	            + "<p>Trân trọng,</p>" +
			    "</div>" +
			    "<div class='footer'>" +
			    "<p>&copy; 2024 Thư Viện Atwom. Tất cả quyền được bảo lưu.</p>" +
			    "</div>" +
			    "</div>" +
			    "</body>" +
			    "</html>";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(htmlContent, true); // Set to true to send HTML

		mailSender.send(message);
	}
}

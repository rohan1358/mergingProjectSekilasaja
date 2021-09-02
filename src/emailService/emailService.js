//Email js components
import emailjs from 'emailjs-com';

emailjs.init("user_mgS9ErHnB82c1UyZMHTX8");

export async function sendPaymentNotification(userData, image_url) {
     //Get today's date for payment date
     var today = new Date(); //Date of payment
     var date = today.getDate().toString();
     var month = today.getMonth() < 10 ? '0' + today.getMonth().toString() : today.getMonth().toString();
     var year = today.getFullYear().toString();
     var complete_date = date + '/' + month + '/' + year;

    //Generate email notification
    await emailjs.send('service_sekilasAja', 'template_l2e9rpk', {
        first_name: userData.user.firstName,
        last_name: userData.user.lastName,
        date: complete_date,
        email: userData.user.email,
        image_url: image_url
    }).then(res => {
          console.log('Email notification successfully sent!');
    }).catch(err => console.log('Error in sending email notification:', err))
}
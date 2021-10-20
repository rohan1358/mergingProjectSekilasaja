//Email js components
import emailjs from "emailjs-com";

emailjs.init("user_mgS9ErHnB82c1UyZMHTX8");

export async function sendPaymentNotification(
  userData,
  image_url,
  nama_bank,
  nama_di_rekening,
  nomor_rekening,
  kode_promo,
  items
) {
  //Get today's date for payment date
  var today = new Date(); //Date of payment
  var date = today.getDate().toString();
  var month =
    today.getMonth() < 10
      ? "0" + (today.getMonth() + 1).toString()
      : today.getMonth().toString() + 1;
  var year = today.getFullYear().toString();
  var complete_date = date + "/" + month + "/" + year;

  //Generate string for items
  console.log(items);
  var items_string = "";
  var total_price = 0;
  items.forEach((item) => {
    items_string =
      items_string + item.book_title + "        " + item.price + "<br>";
    total_price = total_price + item.price;
  });

  //Generate email notification
  await emailjs
    .send("service_sekilasAja", "template_l2e9rpk", {
      first_name: userData.user.firstName,
      last_name: userData.user.lastName,
      date: complete_date,
      email: userData.user.email,
      image_url: image_url,
      nama_bank: nama_bank,
      nama_di_rekening: nama_di_rekening,
      nomor_rekening: nomor_rekening,
      kode_promo: kode_promo,
      items: items_string,
      total_price: total_price,
    })
    .then((res) => {
      console.log("Email notification successfully sent!");
    })
    .catch((err) => console.log("Error in sending email notification:", err));
}

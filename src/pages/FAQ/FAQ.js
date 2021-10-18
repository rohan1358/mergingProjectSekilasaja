import React from "react";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import Footer from "../../components/Footer";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import { beigeColor } from "../../styles/Style";
import FAQBar from "./FAQBar";

// Material-UI components
import { Container } from "@material-ui/core";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";

const FAQBackground =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Ffaq.jpg?alt=media&token=bc550e8f-4cab-4842-a1f8-ba86850c25f8";

export default function FAQ({ history }) {
  return (
    <div style={{ backgroundColor: beigeColor }}>
      <div style={{ marginTop: "70px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />
      <Parallax small filter image={FAQBackground}>
        <Typography color="beigeColor" size="heading">
          FAQ (Frequently Asked Questions)
        </Typography>
      </Parallax>

      <Container maxWidth="md">
        <div style={{ marginTop: "40px" }} /> {/* FAQ #5 */}
        <FAQBar
          question="Apa itu SekilasAja?"
          answer={
            <div>
              <Typography>
                SekilasAja adalah platform edukasi yang bertujuan untuk
                meningkatkan minat baca di Indonesia. Melalui aplikasi
                SekilasAja, Kamu bisa menghabiskan 1 buku hanya dalam 15 menit.
              </Typography>
              <Typography>
                SekilasAja merangkumkan buku terbaik dunia dengan bahasa yang
                mudah untuk dimengerti dan semuanya sudah dalam bahasa
                Indonesia. Terdapat juga versi audio dan videonya.
              </Typography>
            </div>
          }
        />
        <div style={{ marginTop: "20px" }} />
        {/* FAQ #6 */}
        <FAQBar
          question="Benefit jadi member SekilasAja apa?"
          answer={
            <div>
              <Typography>
                1. Harganya yang SANGAT MURAH. Mulai dari Rp.1000 per hari.
              </Typography>
              <Typography>2. Hanya 15 MENIT bisa mengerti 1 BUKU</Typography>
              <Typography>3. Tersedia dalam bentuk Audio dan Video</Typography>
              <Typography>4. Semuanya dalam Bahasa Indonesia</Typography>
              <Typography>5. Bahasa yang mudah untuk dimengerti</Typography>
              <Typography>
                6. Komunitas Self-Development eksklusif di Telegram!
              </Typography>
            </div>
          }
        />
        <div style={{ marginTop: "20px" }} />
        {/* FAQ #1 */}
        <FAQBar
          question="Bagaimana cara membuat akun baru / mendaftar?"
          answer={
            <div>
              <Typography>1. Klik tombol “Bergabung sekarang!”</Typography>
              <Typography>
                2. Isi form data diri Kamu seperti nama lengkap, no telp, email,
                dan password.
              </Typography>
              <Typography>
                3. Cek Email Kamu dan lihat Email verifikasi yang sudah
                terkirim.
              </Typography>
              <Typography>
                3. Selamat kamu sudah terdaftar sebagai member kami.
              </Typography>
            </div>
          }
        />
        <div style={{ marginTop: "20px" }} />
        {/* FAQ #2 */}
        <FAQBar
          question="Bagaimana cara untuk berlangganan bulanan / membeli buku?"
          answer={
            <div>
              <Typography>
                1. Klik tombol “Berlangganan sekarang!” atau Klik tombol “Harga”
                di menu bar kanan atas.
              </Typography>
              <Typography>
                2. Di halaman “SUBSCRIPTION”, pilih paket berapa bulan yang Kamu
                inginkan.
              </Typography>
              <Typography>
                3. Kamu juga bisa membeli per satuan buku.
              </Typography>
              <Typography>
                4. Setelah udah sampai di halaman “Checkout Page”, pastikan
                orderan Kamu sudah benar di step 1. Masukkan “kode promo” jika
                Kamu memilikinya.
              </Typography>
              <Typography>
                5. Klik tombol “Apply” dan pemotongan harga akan terjadi dengan
                otomatis.
              </Typography>
              <Typography>
                6. Isi data diri Kamu di “Checkout Form” yang meliputi:
                <div style={{ marginLeft: "15px" }}>
                  <Typography>• Nama lengkap direkening </Typography>{" "}
                  <Typography>• Nomor Rekening atau No HP QRIS </Typography>
                  <Typography>
                    • Nama Akun Telegram Kamu untuk diundang ke group eksklusif
                  </Typography>
                </div>
              </Typography>
              <Typography>
                7. Pilih Metode Pembayaran Kamu seperti BCA transfer, BRI
                transfer, atau QRIS.
              </Typography>
              <Typography>
                8. Screenshot atau foto bukti pembayaran Kamu.
              </Typography>
              <Typography>
                9. Lampirkan bukti pembayaran Kamu di kolom yang sudah
                disediakan.
              </Typography>
              <Typography>10. Klik tombol “Bayar Sekarang”.</Typography>
              <Typography>
                11. Tunggu maksimal 1x24 jam agar Kamu bisa mengakses seluruh
                bukunya.
              </Typography>
              <Typography>
                12. Jika akun Kamu sudah aktif, Kamu akan menerima
                pemberitahuaan di Email Kamu.
              </Typography>
              <Typography>
                13. Jika Kamu tidak bisa mengakses buku Kamu setelah 1x24 jam,
                mohon untuk menghubungi customer service SekilasAja! melalui
                Whatsapp atau Email.
              </Typography>
            </div>
          }
        />
        <div style={{ marginTop: "20px" }} />
        {/* FAQ #4 */}
        <FAQBar
          question="Apa perbedaan berlangganan bulanan dan beli per Kilas?"
          answer={
            <div>
              <Typography>
                Jika Kamu berlangganan bulanan, Kamu bisa mengakses semua
                rangkuman buku (Kilas) selama Kamu masih berlangganan.
              </Typography>
              <Typography>
                Jika Kamu membeli per rangkuman buku (kilas), Kamu hanya dapat
                mengakses rangkuman buku (kilas) yang Kamu beli untuk selamanya.
              </Typography>
            </div>
          }
        />
        <div style={{ marginTop: "20px" }} />
        {/* FAQ #3 */}
        <FAQBar
          question="Bagaimana cara menggunakan Kode Promo?"
          answer={
            <div>
              <Typography>
                1. Pastikan Kamu sudah menerima “Kode Promo” dari SekilasAja!
              </Typography>
              <Typography>
                2. Setelah udah sampai di halaman “Checkout Page”, pastikan
                orderan Kamu sudah benar di step 1. Masukkan “kode promo” jika
                Kamu memilikinya.
              </Typography>
              <Typography>
                3. Klik tombol “Apply” dan pemotongan harga akan terjadi dengan
                otomatis.
              </Typography>
              <Typography>
                4. Isi data diri Kamu di “Checkout Form” yang meliputi:
                <div style={{ marginLeft: "15px" }}>
                  <Typography>• Nama lengkap direkening </Typography>{" "}
                  <Typography>• Nomor Rekening atau No HP QRIS </Typography>
                  <Typography>
                    • Nama Akun Telegram Kamu untuk diundang ke group eksklusif
                  </Typography>
                </div>
              </Typography>
              <Typography>
                5. Pilih Metode Pembayaran Kamu seperti BCA transfer, BRI
                transfer, atau QRIS.
              </Typography>
              <Typography>
                6. Screenshot atau foto bukti pembayaran Kamu.
              </Typography>
              <Typography>
                7. Lampirkan bukti pembayaran Kamu di kolom yang sudah
                disediakan.
              </Typography>
              <Typography>8. Klik tombol “Bayar Sekarang”.</Typography>
              <Typography>
                9. Tunggu maksimal 1x24 jam agar Kamu bisa mengakses seluruh
                bukunya.
              </Typography>
              <Typography>
                10. Jika akun Kamu sudah aktif, Kamu akan menerima
                pemberitahuaan di Email Kamu.
              </Typography>
              <Typography>
                11. Jika Kamu tidak bisa mengakses buku Kamu setelah 1x24 jam,
                mohon untuk menghubungi customer service SekilasAja! melalui
                Whatsapp atau Email.
              </Typography>
            </div>
          }
        />
        <div style={{ marginTop: "20px" }} />
        {/* FAQ #8 */}
        <FAQBar
          question="CASHBACK bisa didapatkan darimana? Masa berlaku CASHBACK berapa lama? (Kode Promo Pre-Launch)!"
          answer={
            <div>
              <Typography>
                Untuk yang sudah membeli buku rangkuman pada saat masa
                Pre-Launch, Kamu akan mendapatkan CASHBACK sesuai dengan nominal
                yang Kamu belanjakan di masa Pre-Launch.
              </Typography>
              <Typography>
                CASHBACK tersebut akan dikirimkan dalam bentuk Kode Promo di
                Email Kamu.
              </Typography>
              <Typography>
                Admin SekilasAja! sudah mengirimkan Kode Promo beserta cara
                menggunakannya ke Email yang Kamu pakai pada saat menerima buku
                rangkuman Google Drive SekilasAja!
              </Typography>
              <Typography>
                Emailnya berjudul "Kode Promo SekilasAja! - Terima Kasih" dari
                Email hi@sekilasaja.com
              </Typography>
              <Typography>
                Untuk masa berlakunya, hanya sampai tanggal 9 Oktober 2021.
              </Typography>
            </div>
          }
        />
        <div style={{ marginTop: "20px" }} />
        {/* FAQ #7 */}
        <FAQBar
          question="Bagaimana cara join ke Grup Eksklusif di Telegram?"
          answer={
            <div>
              <Typography>
                Pastikan Kamu menuliskan akun Telegram Kamu di kolom yang sudah
                tersedia pada "Checkout Page".
              </Typography>
              <Typography>
                Setelah sudah berlangganan atau sudah menjadi member, Kamu akan
                diundang masuk kedalam grup eksklusif Telegram tersebut. Jadi,
                pastikan Kamu berlangganan dulu ya!
              </Typography>
            </div>
          }
        />
        <div style={{ marginTop: "20px" }} />
      </Container>

      {/*---------------------------------------------------------------*/}
      {/*---------------------- WHATSAPP FIXED NAV ---------------------*/}
      {/*---------------------------------------------------------------*/}
      <a href="https://wa.me/message/JC5E4YLJBCKTE1" target="_blank">
        <Tooltip
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              <WhatsAppIcon fontSize="large" style={{ marginRight: "10px" }} />
              Klik tombol ini dan langsung hubungi kami di Whatsapp bila ada
              pertanyaan!
            </div>
          }
          placement="right"
        >
          <img
            src={Whatsapp}
            style={{
              position: "fixed",
              bottom: 15,
              left: 15,
              width: "60px",
              "&:hover": {
                filter: "brightness(150%)",
              },
            }}
          />
        </Tooltip>
      </a>
      <Footer />
    </div>
  );
}

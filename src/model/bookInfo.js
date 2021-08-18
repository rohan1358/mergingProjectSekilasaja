//Class to store information about books
export default class BookInfo {
    constructor(title, author, audioLink, videoLink, category, kilasan, ringkasanAkhir, bookCoverImageLink, bookDashboardImageLink)  {
        this.title = title;
        this.author = author;
        this.audioLink = audioLink;
        this.videoLink = videoLink;
        this.category = category;
        this.kilasan = kilasan;
        this.ringkasanAkhir = ringkasanAkhir
        this.bookCoverImageLink = bookCoverImageLink;
        this.bookDashboardImageLink = bookDashboardImageLink;
    }
}
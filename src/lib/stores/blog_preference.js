export const stored_preference = {
    live: false,
    site: '',
    site_title: "Biro Kemahasiswaan UMKO",
    site_subtitle: "Dukung Kreativitas, Wujudkan Inovasi!",
    site_description: "Unit Kemahasiswaan UMKO adalah bagian dari Universitas Muhammadiyah Kotabumi yang bertugas mengelola kegiatan kemahasiswaan, seperti organisasi, pembinaan minat dan bakat, serta layanan mahasiswa. Unit ini mendukung pengembangan karakter, soft skills, dan potensi mahasiswa agar siap berkontribusi di masyarakat.",
    site_logo: "media/logo.png",
    site_favicon: "favicon.png",
    contact_email: "kemahasiswaan@umko.ac.id",
    contact_phone: "+62-823-7361-1057",
    navbars: [
        { title: "Beranda", link: "/", icon: "fa-home", order: 1, parent: null, preference: 1, children: [] },
        { title: "Umum", link: "/post/all", icon: null, order: 2, parent: 2, preference: 1, children: [] },
        { title: "Beasiswa", link: "/scholarship", icon: "fa-award", order: 3, parent: null, preference: 1, children: [] },
        { title: "Prestasi", link: "/achievement", icon: "fa-universal-access", order: 4, parent: null, preference: 1, children: [] },
        { title: "Penmaru", link: "https://pmb.umko.ac.id", icon: "fa-university", order: 5, parent: null, preference: 1, children: [] },
        { title: "Alumni", link: "/", icon: "fa-users", order: 6, parent: null, preference: 1, children: [] }
    ],
    social_medias: {
        facebook_url: "https://www.facebook.com/umktb",
        twitter_url: "https://www.twitter.com/umktb",
        instagram_url: "https://www.instagram.com/umktb",
        linkedin_url: "https://www.linkedin.com",
        youtube_url: "https://www.youtube.com",
    },
    page_setting: {
        page_title: "Beranda",
        page_description: "",
        popup_info: null,
        popup_image: null,
        slideshows: [
            { id: 1, title: "Biro Kemahasiswaan UMKO", description: "<p>Unit Kemahasiswaan UMKO adalah bagian dari Universitas Muhammadiyah Kotabumi yang bertugas mengelola kegiatan kemahasiswaan, seperti organisasi, pembinaan minat dan bakat, serta layanan mahasiswa. Unit ini mendukung pengembangan karakter, soft skills, dan potensi mahasiswa agar siap berkontribusi di masyarakat.<br></p>", image: "/media/slideshow/slide-1.jpg", link: null, order: 0 },
            { id: 2, title: "Penerimaan Mahasiswa Baru", description: "", image: "/media/slideshow/slide-2.jpg", link: null, order: 0 },
            { id: 3, title: "Biro Kemahasiswaan UMKO", description: "", image: "/media/slideshow/slide-3.jpg", link: null, order: 0 }
        ]
    }
};
  
export default class AboutModel {
  getPersonalInfo() {
    return {
      title: "Me at Coding Camp",
      subtitle:
        "My moments, life at coding camp 2025 powered by DBS Foundation",
      description: [
        "I graduated from a vocational high school majoring in electrical power installation engineering. I am a fast learner with new things, I am also tenacious in the things that I pursue or work on.",
        "I have some experience working in contractors as a quality control and field supervisor, I also have work experience as an admin for approximately 3 years, and now I am studying to become a software engineer.",
      ],
    };
  }

  getLearnedSkills() {
    return [
      {
        icon: "https://cdn-icons-png.flaticon.com/512/9094/9094993.png",
        title: "Frontend",
        description:
          "Focuses on creating the user interface (UI) of a website or application that users directly interact with.",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/6213/6213731.png",
        title: "Backend",
        description:
          "The server-side components and infrastructure that handle data processing, storage, and logic behind a web application or software.",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/256/6171/6171939.png",
        title: "Soft Skill",
        description:
          "Personal attributes and interpersonal abilities that describe how someone works and interacts with others.",
      },
    ];
  }

  getTeamMembers() {
    return [
      {
        name: "Yuda Reyvandra Herman",
        role: "Team Leader (MC)",
        image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      },
      {
        name: "Damianus Christopher S",
        role: "Member (MC)",
        image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      },
      {
        name: "Reksi Hendra Pratama",
        role: "Member (MC)",
        image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      },
      {
        name: "Muhammad Wildan Nur",
        role: "Member (FEBE)",
        image: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
      },
      {
        name: "Marsella Vindriani",
        role: "Member (FEBE)",
        image:
          "https://media-cgk1-2.cdn.whatsapp.net/v/t61.24694-24/483643490_1319836789318407_2555980662427249054_n.jpg?ccb=11-4&oh=01_Q5Aa1QEE1NBwN3QaExY_ykoZV1_ozhIm1DsKyhKtJ4yFmbxiyQ&oe=68222CEB&_nc_sid=5e03e0&_nc_cat=104",
      },
      {
        name: "Miftahurrohman",
        role: "Member (FEBE)",
        image: "https://cdn-icons-png.flaticon.com/512/5556/5556499.png",
      },
    ];
  }

  getContactInfo() {
    return {
      email: "mf.rohman0101@gmail.com",
      phone: "+62 823 4082 3214",
      address: "Jl. Manunggal No.61, Semanding Tuban, Jawa Timur 62391",
      socials: [
        {
          name: "Tiktok",
          url: "https://www.tiktok.com/@_died00?_t=ZS-8w1rzCZphZ9&_r=1",
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/mf.en.er?igsh=NHExOG83eGEyZHE3",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/‎-miftahurrohman-717a12342",
        },
      ],
    };
  }
}

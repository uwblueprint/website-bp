interface Resource {
    [key: string]: string;
}
const resource: Resource = {
    // nav bar text
    NAVBAR_ABOUT_US: "About Us",
    NAVBAR_PROJECTS: "Projects",
    NAVBAR_STUDENTS: "Students",
    NAVBAR_CONTACT: "Contact",
    NAVBAR_JOIN_US: "Join Our Team",
    NAVBAR_NON_PROFITS: "For Nonprofits",
    // home page text
    HOME_TITLE: "This is BP",

    // contact us page text
    CONTACT_TITLE: "Contact us!",
    CONTACT_DESCRIPTION:
        "Have a question? Interested in a potential project but unsure what our team can help you with? Send us an email or connect with us on our social media!",

    // join us page text
    JOIN_US_INTRO_HEADER: "Join Our Team",
    JOIN_US_INTRO_DESCRIPTION:
        "Making technology accessible and useful for those who create communities.",
    JOIN_US_APPLY_BUTTON: "Apply Now",
};

export default resource;

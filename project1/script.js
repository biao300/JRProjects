//sass D:\Work\Projects\htdocs\project1\style.scss D:\Work\Projects\htdocs\project1\style.css
console.log("hello project one");




function changeTab(btn) {
    //console.log(btn.id);
    let nav_ids = [
        "nav__home",
        "nav__resume",
        "nav__service",
        "nav__about"
    ];

    let content_ids = [
        "content__home",
        "content__resume",
        "content__service",
        "content__about"
    ];

    let i = 0;
    for (i = 0; i < nav_ids.length; i++) {
        if (btn.id === nav_ids[i]) {
            document.getElementById(nav_ids[i]).setAttribute("class", "focus");
            document.getElementById(content_ids[i]).setAttribute("class", "");
        } else {
            document.getElementById(nav_ids[i]).setAttribute("class", "");
            document.getElementById(content_ids[i]).setAttribute("class", "hide");
        }
    }
}
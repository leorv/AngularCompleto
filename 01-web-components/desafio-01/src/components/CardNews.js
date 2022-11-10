class Cardnews extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "closed" });

        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
    }

    build() {
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "card");

        const cardLeft = document.createElement("div");
        cardLeft.setAttribute("class", "card__left");

        const autor = document.createElement("span");
        autor.textContent = `By ${this.getAttribute("autor")}` || "By anonymous";

        const linkTitle = document.createElement("a");
        linkTitle.textContent = this.getAttribute("title");
        linkTitle.href = this.getAttribute("link-url");

        const newsContent = document.createElement("p");
        newsContent.textContent = this.getAttribute("content");

        cardLeft.appendChild(autor);
        cardLeft.appendChild(linkTitle);
        cardLeft.appendChild(newsContent);

        const cardRight = document.createElement("div");
        cardRight.setAttribute("class", "card__right");

        const newsImage = document.createElement("img");
        newsImage.src = this.getAttribute("photo") || "assets/img-default.png";
        newsImage.alt = "Imagem da notícia";
        cardRight.appendChild(newsImage);

        componentRoot.appendChild(cardLeft);
        componentRoot.appendChild(cardRight);

        return componentRoot;
    }

    styles() {
        const style = document.createElement("style");
        style.textContent = `
.card {
    width: 80%;
    border: 1px solid gray;
    display: flex;
    flex-direction: row;
    -webkit-box-shadow: 10px 10px 13px -10px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 13px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 13px -10px rgba(0, 0, 0, 0.75);
    justify-content: space-between;
}

.card__left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
}

.card__left h1 {
    margin-top: 10px;
    font-size: 25px;
}

.card__left p {
    color: gray;
}

.card__left span {
    font-weight: 400;
}

.card__right {}

img {
height: 250px;
}
        `

        return style;
    }
}

customElements.define("card-news", Cardnews);
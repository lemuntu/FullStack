// Load Stripe dynamically
const stripeScript = document.createElement("script");
stripeScript.src = "https://js.stripe.com/v3/";
stripeScript.onload = async () => {
  const stripePromise = Stripe("pk_test_51HLB1VAVrFJ41twSho8C6M1pTCd3Gs564bdd0OKSgZEQwB2y6QcEaBmYNSG1JdDrFnKj5nvGVLXIt62T72CYeDdR00vqDUzPno"); // Replace with your actual Stripe Publishable Key

  document.querySelectorAll(".buyButton").forEach((button) => {
    button.addEventListener("click", async () => {
      const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000 }), // Amount in cents
      });
  
      const data = await response.json();
  
      if (data.sessionId) {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
  
        if (result.error) {
          console.error(result.error.message);
        }
      } else {
        console.error("No session ID returned from backend");
      }
    });
  });
  
};
document.head.appendChild(stripeScript);


const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    choosenProduct = products[index];
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

const stripePromise = Stripe("pk_test_51HLB1VAVrFJ41twSho8C6M1pTCd3Gs564bdd0OKSgZEQwB2y6QcEaBmYNSG1JdDrFnKj5nvGVLXIt62T72CYeDdR00vqDUzPno"); // Replace with your actual Stripe publishable key

productButton.addEventListener("click", async () => {
  const stripe = await stripePromise;
  payment.style.display = "flex";
  
  const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: choosenProduct.price * 100,
      currency: "usd"
    })
  });
  
  const { sessionId } = await response.json();
  const result = await stripe.redirectToCheckout({ sessionId });
  
  if (result.error) {
    console.error(result.error.message);
  }
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

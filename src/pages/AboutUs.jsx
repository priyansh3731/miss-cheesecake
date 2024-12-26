import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';  // Import Footer component
import '../css/About.css'
import team from '../assets/team.jpeg'

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-us">
        <h1 className="about-us-h1">About Miss Cheesecake</h1>

        <section className="about-us-section">
          <h2 className="about-us-h2">Directors | Founders</h2>
          <img src={team} />
          <p className="about-us-p">
          Pooja balani | Narpath singh rathor
          </p>
          <p className="about-us-p">
          Business established on 11 November 2023
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-h2">Our Story</h2>
          <p className="about-us-p">
            Miss Cheesecake is a delightful dessert brand founded by two passionate individuals, Pooja Balani and Narpat Singh Rathore. Pooja, with her love for fine desserts and a keen eye for detail, brings a creative touch to every cheesecake she crafts. Narpat, on the other hand, brings his extensive knowledge of business and operations, ensuring that each customer experiences the highest quality and service.
          </p>
          <p className="about-us-p">
            Together, they envisioned Miss Cheesecake as a haven for cheesecake lovers, offering a variety of rich, flavorful, and uniquely crafted cheesecakes that cater to every taste. From classic flavors to innovative twists, Miss Cheesecake stands as a symbol of indulgence, quality, and a perfect fusion of creativity and tradition.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-h2">Our Team</h2>
          <p className="about-us-p">
            Behind every delicious treat is a team of passionate bakers, decorators, and service staff who pour their hearts into their work. From our master bakers with decades of experience to our enthusiastic apprentices, everyone at Miss Cheesecake shares a love for creating memorable experiences through food.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-h2">Our Values</h2>
          <ul className="about-us-ul">
            <li className="about-us-li">Quality ingredients, no compromises</li>
            <li className="about-us-li">Creativity in every recipe</li>
            <li className="about-us-li">Warm, welcoming service</li>
            <li className="about-us-li">Community involvement and support</li>
            <li className="about-us-li">Sustainable practices</li>
          </ul>
        </section>

        {/* Our Items Section */}
        <section className="about-us-section">
          <h2 className="about-us-h2">Our Items</h2>
          <ul className="about-us-ul">
            <li className="about-us-li">
              <strong>Butter Cookies:</strong> Classic and indulgent, our butter cookies are made with 100% pure butter, giving them a rich, melt-in-your-mouth texture. These golden delights offer a perfectly balanced sweetness and a luxurious, buttery flavor in every bite.
            </li>
            <li className="about-us-li">
              <strong>Cashew Pista Cookies:</strong> Nutty and flavorful, these cookies are loaded with crunchy cashews and pistachios. Perfectly balanced with a hint of sweetness, they offer a delightful combination of rich, roasted nut flavors for a satisfying treat.
            </li>
            <li className="about-us-li">
              <strong>Jaggery Cookies:</strong> Naturally sweetened with jaggery and enriched with sesame seeds, these cookies are both sugar-free and wholesome. With their warm, earthy flavors, they’re perfect for those seeking a guilt-free, nutritious indulgence.
            </li>
            <li className="about-us-li">
              <strong>Jeera Cookies:</strong> Our jeera cookies are a savory delight, flavored with aromatic cumin seeds. Light and crispy, they provide a unique blend of savory spices and subtle sweetness, perfect for pairing with a hot cup of tea.
            </li>
            <li className="about-us-li">
              <strong>Ajwain Cookies:</strong> These ajwain cookies bring a unique, slightly peppery twist with their carom seed flavor. Crisp and aromatic, they’re ideal for those who love savory snacks with a hint of spice, making each bite both refreshing and delicious.
            </li>
          </ul>
        </section>
      </div>

      {/* Add Footer Component here */}
      <Footer />
    </>
  );
};

export default AboutUs;

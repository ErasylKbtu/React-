function Hero() {
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <div className="hero-text">
                    <p className="welcome-text">Hello, I'm</p>

                    <h1>
                        Karas <span>Yerassyl</span>
                    </h1>

                    <h2>Information Systems Student</h2>

                    <p className="hero-description">
                        I am interested in web development, modern technologies
                        and building useful digital products. I enjoy learning
                        new things and improving my programming skills.
                    </p>

                    <div className="hero-buttons">
                        <a href="#about" className="primary-button">
                            About Me
                        </a>

                        <a href="#contact" className="secondary-button">
                            Contact
                        </a>
                    </div>
                </div>

                <div className="hero-image-container">
                    <div className="image-background"></div>

                    <img
                        className="profile-image"
                        src={`${import.meta.env.BASE_URL}profile.jpg`}
                        alt="Karas Yerassyl"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;
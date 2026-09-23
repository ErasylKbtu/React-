const skills = [
    {
        name: "JavaScript",
        icon: "JS",
        description: "ES6+, async programming and DOM"
    },
    {
        name: "React",
        icon: "⚛",
        description: "Components, props and SPA development"
    },
    {
        name: "HTML",
        icon: "<>",
        description: "Semantic and structured markup"
    },
    {
        name: "CSS",
        icon: "#",
        description: "Responsive layouts and modern styling"
    },
    {
        name: "Git",
        icon: "G",
        description: "Version control and GitHub"
    },
    {
        name: "Programming",
        icon: "{ }",
        description: "Problem solving and application development"
    }
];

function Skills() {
    return (
        <section className="section skills-section" id="skills">
            <div className="section-container">
                <div className="section-title">
                    <p>What I work with</p>
                    <h2>My Skills</h2>
                </div>

                <div className="skills-grid">
                    {skills.map((skill) => (
                        <div className="skill-card" key={skill.name}>
                            <div className="skill-icon">
                                {skill.icon}
                            </div>

                            <div>
                                <h3>{skill.name}</h3>
                                <p>{skill.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
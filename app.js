const planet_section = document.querySelector('body')
var test = ['earth', 'venus', 'mars']

const fetchPlanets = async () => {
    for (var i = 0; i < 3; i++) {
        await getPlanet(test[i]);
    }
};

const getPlanet = async id => {
    const url = `https://api.le-systeme-solaire.net/rest/bodies/${id}`;
    const res = await fetch(url);
    const planet = await res.json();
    createPlanetCard(planet);
};

function createPlanetCard(planet) {
    const planetCard = document.createElement('section');
    let name = planet.englishName.toLowerCase();
    const gravity = planet.gravity;
    const density = planet.density;
    const radius = Math.floor(planet.equaRadius);
    const temp = kelvinToCelsius(planet.avgTemp);

    const planetInnerHTML =
                            `
                            <div class="container">
                                <div class="main">
                                    <img src="/img/${name}.png" alt="${name}">
                                    <div class="info">
                                        <h1 id="name">${name}</h1>
                                        <p id="infotxt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum recusandae inventore ipsam quia earum iure ut, quis velit qui? Iusto libero qui, eos rerum magnam beatae blanditiis, repudiandae suscipit praesentium dolores, architecto facilis voluptates cum!</p>
                                    </div>
                                </div>
                                <div class="facts">
                                    <div class="card">
                                        <p>Gravity</p>
                                        <h2 id="gravity${name}">${gravity}</h2>
                                    </div>
                                    <div class="card">
                                        <p>density</p>
                                        <h2 id="density${name}">${density}</h2>
                                    </div>
                                    <div class="card">
                                        <p>Radius</p>
                                        <h2 id="radius${name}">${radius} km</h2>
                                    </div>
                                    <div class="card">
                                        <p>Average temp</p>
                                        <h2 id="temp${name}">${temp} °C</h2>
                                    </div>
                                </div>
                            </div>
                            `;

    planetCard.innerHTML = planetInnerHTML;
    planetCard.id = name
    planet_section.appendChild(planetCard);
}

fetchPlanets();

function kelvinToCelsius(temp) {
    return Math.floor(temp - 273.15);
}
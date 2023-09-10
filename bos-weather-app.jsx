State.init({ city: "Lagos", unit: "metric", weather: null });

const bgCold =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1694077947/Weather/cold2_p13fuw.jpg";
const bgHot =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1694077946/Weather/hot_gc8qai.webp";
const tempIcon =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1694077946/Weather/cloud-solid_dlvsum.svg";
const ArrowDown =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1694085420/Weather/arrow-down_lswsg8.svg";

const API_KEY = "ace7985557386b32c9d545d37d09dd8d";

function getWeatherData(city, units) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  asyncFetch(weatherUrl, units).then((res) => {
    State.update({ weather: res.body });
  });
}

function init() {
  if (!state.weather) {
    getWeatherData(state.city, state.unit);
  }
}

init();

function handleClick() {
  getWeatherData(state.city, state.unit);
}

console.log(state.city);
console.log(state.location);

console.log(state.weather);
const {
  weather,
  main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
  wind: { speed },
  sys: { country },
  name,
} = state.weather;

const { description, icon } = weather[0];
function makeIconUrl(iconId) {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
}
const iconUrl = makeIconUrl(icon);

const tempUnit = state.unit === "metric" ? "ºC" : "ºF";
const windUnit = state.unit === "metric" ? "m/s" : "m/h";

const card = [
  {
    id: 1,
    icon: <i class="bi bi-arrow-down"></i>,
    title: "min",
    data: temp_min.toFixed(),
    unit: tempUnit,
  },
  {
    id: 2,
    icon: <i class="bi bi-arrow-up"></i>,
    title: "max",
    data: temp_max.toFixed(),
    unit: tempUnit,
  },
  {
    id: 3,
    icon: <i class="bi bi-emoji-smile"></i>,
    title: "feels like",
    data: feels_like.toFixed(),
    unit: tempUnit,
  },
  {
    id: 4,
    icon: <i class="bi bi-building-down"></i>,
    title: "pressure",
    data: pressure,
    unit: "hPa",
  },
  {
    id: 5,
    icon: <i class="bi bi-droplet"></i>,
    title: "humidity",
    data: humidity,
    unit: "%",
  },
  {
    id: 6,
    icon: <i class="bi bi-wind"></i>,
    title: "wind speed",
    data: speed.toFixed(),
    unit: windUnit,
  },
];

console.log(state.location);
console.log(state.city);

const App = styled.div`
font-family: Verdana, Genrva, Tahoma, sans-serif;
width: 100%;
height: 100vh;
background-position: center;
background-size:cover;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.2);
`;

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem;
`;

const SectionInputs = styled.div`
width: 100%;
padding: 1rem;
border-radius: 0.4rem;
color: white;

display: flex;
align-items: center;
justify-content: space-between;
background-color: rgba(0,0,0,0.7);
@media screen and (max-width: 768px){
  flex-direction: column;
  margin-bottom: 20px;
}

`;

const Button = styled.button`
  padding: 10px 50px;
  border: none;
  border-radius: 0.4rem;
  font-size: 20px;
  font-weight: 500;
  background-color: white;
  &:hover{
    cursor: pointer;
    background-color: lightgray;
  }
  @media screen and (max-width: 768px){
  margin-top: 15px;
}
`;

const SectionTemperature = styled.div`
width: 100%;
padding: 1rem;
border-radius: 0.4rem;
color: white;
display: flex;
align-items: center;
justify-content: space-between;
background-color: rgba(0,0,0,0.7);
 @media screen and (max-width: 6768x){
  margin-bottom: 20px;
}

`;

const IconTitle = styled.h3`
  font-size: 15px;
  font-weight: 200;
  text-transform: capitalize
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center  
`;

const Temperature = styled.div`
  
`;

const TempTitle = styled.div`
  font-size: 60px;
`;

const Input = styled.input`
border: 0.8px solid white;
border-radius: 0.4rem;
background-color: transparent;
padding: 0.5rem;
font-size: 20px;
font-weight: 200;
color: white;
&:focus{
  outline: none;
}
@media screen and (max-width: 768px){
  margin: 0 20px;
}
`;

const Description = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
gap: 1.5rem;
color: white;
@media screen and (max-width: 768px){
  margin-top: 15px;
  1rem;

}
`;
const Card = styled.div`
width: 25%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: rgba(0,0,0,0.7);
padding: 1rem;
border-radius: 0.4rem;
@media screen and (max-width: 768px){
  width: 40%;
}
`;

const CardIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 12px;
`;

const CardTitle = styled.h2`
font-size: 1.2rem;
`;
return (
  <>
    <App style={{ backgroundImage: `url(${bgHot})` }}>
      <Overlay>
        {state.weather && (
          <Container>
            <SectionInputs>
              <Input
                type="text"
                name="city"
                placeholder="Enter City..."
                onChange={(e) => State.update({ city: e.target.value })}
              />
              <Button onClick={handleClick}>GET DATA</Button>
            </SectionInputs>
            <SectionTemperature>
              <Icon>
                <IconTitle>
                  {name}, {country}
                </IconTitle>
                <img
                  src={iconUrl}
                  width="50px"
                  height="50px"
                  alt="Weather-icon"
                />
                <IconTitle>{description}</IconTitle>
              </Icon>
              <Temperature>
                <TempTitle>
                  {temp.toFixed()}
                  {state.unit === "metric" ? "ºC" : "ºF"}
                </TempTitle>
              </Temperature>
            </SectionTemperature>
            <Description>
              {card.map(({ id, icon, title, data, unit }) => {
                return (
                  <Card key={id}>
                    <CardIcon>
                      {icon}
                      <small>{title}</small>
                    </CardIcon>
                    <CardTitle>
                      {data}
                      {unit}
                    </CardTitle>
                  </Card>
                );
              })}
            </Description>
          </Container>
        )}
      </Overlay>
    </App>
  </>
);

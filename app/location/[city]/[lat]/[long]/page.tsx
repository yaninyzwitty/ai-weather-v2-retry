import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import Infopage from "@/components/Infopage";
import RainChart from "@/components/RainChart";
import Statcard from "@/components/Statcard";
import TempChart from "@/components/TempChart";
import fetchWeatherQueries from "@/graphql/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import { getBasePath } from "@/lib/getBasePath";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function Weatherpage({ params: { city, lat, long } }: Props) {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQueries,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;

  const resultsToSend = cleanData(results, city);
  // coz it is server side component

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      weatherData: resultsToSend,
    }),
  });
  const GPTdata = await res.json();
  const { content } = GPTdata;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* INfopahe */}
      <Infopage city={city} results={results} long={long} lat={lat} />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today's overview</h2>
            <p className="text-sm text-gray-400">
              Last updated at{" "}
              {new Date(results.current_weather.time).toLocaleString()}
              {results.timezone}
            </p>
          </div>
          <div>
            <CalloutCard message={content} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <Statcard
              title={"Maximum temparature"}
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color={"yellow"}
            />
            <Statcard
              title={"Minimum temparature"}
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color={"green"}
            />
            <div>
              <Statcard
                title={"UV index"}
                metric={`${results.daily.uv_index_max[0].toFixed(1)}mW/m2`}
                color={"rose"}
              />
              {Number(results.daily.temperature_2m_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message="UV Index is high please wear SPF"
                  warning
                />
              )}
            </div>
            <div className="flex space-x-3">
              <Statcard
                metric={`${results.current_weather.windspeed.toFixed(1)}km/hr`}
                title="Wind speed"
                color="cyan"
              />
              <Statcard
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                title="Wind direction"
                color="violet"
              />
            </div>
          </div>
          <hr className="mb-5" />
          <div className="space-y-3">
            <TempChart results={results} />
            <RainChart results={results} />
            <HumidityChart results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weatherpage;

// use this boys-->>

// https://api.open-meteo.com/v1/forecast?
// latitude=51.51
// &longitude=-0.13
// &hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky,is_day
// &daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max
// &current_weather=true
// &timezone=Europe%2FLondon

"use client";
import { City, Country } from "country-state-city";
import Select from "react-select";

import { useState } from "react";
import { useRouter } from "next/navigation";
type option = {
  value: {
    longitude: string;
    latitude: string;
    isocode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    statusCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    longitude: country.longitude,
    latitude: country.latitude,
    isocode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setselectedCountry] = useState<option>(null);
  const [selectedCity, setselectedCity] = useState<cityOption>(null);
  const router = useRouter();
  const handleSelectCountry = (option: option) => {
    setselectedCountry(option);
    setselectedCity(null);
  };

  const handleSelectedCity = (option: cityOption) => {
    setselectedCity(option);
    // route to the selected city
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    );
  };
  return (
    <div className="space-y-4">
      <Select
        className="text-black"
        options={options}
        value={selectedCountry}
        onChange={handleSelectCountry}
      />

      {selectedCountry && (
        <Select
          className="text-black"
          // @ts-ignore
          options={City?.getCitiesOfCountry(
            selectedCountry?.value?.isocode
          )?.map((state) => ({
            value: {
              latitude: state.latitude!,
              longitude: state.longitude!,
              countryCode: state.countryCode!,
              name: state.name!,
              stateCode: state.stateCode!,
            },
            label: state.name!,
          }))}
          value={selectedCity}
          onChange={handleSelectedCity}
        />
      )}
    </div>
  );
}

export default CityPicker;

"use client";
import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-br from-[#394568] to-[#18387E]">
      <Card className="max-w-4xl mx-auto">
        <Text className="text-6xl font-bold text-center mb-10">
          Weather Ai.2.0
        </Text>
        <Subtitle className="text-xl  text-center">
          Powered by openai, Tremor 2.0 and Next js13
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gradient-to-br from-[#394568] to-[#18387E]">
          {/* Hello */}
          <CityPicker />
        </Card>
      </Card>
    </main>
  );
}

export default Home;

// pages/index.tsx
import React from 'react';
import AppBar from '../components/layout/AppBar';
import CustomCard from '../components/ui/CustomCard';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import  {Button }  from '../components/ui/button';
import AccountMenu from '@/components/account/AccountMenu';
import Link from "next/link";
import Image from 'next/image';

const Home = () => {
  return (
    <div>
      <AppBar />
      <main className="container mx-auto px-6 lg:px-12 max-w-7xl mt-24"> 
        <section className="my-12 mx-6 border p-8 rounded-md"> 
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"> 
              <div className="w-full md:w-3/4">
                <ImagePlaceholder />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:ml-20 text-left"> 
              <h1 className="text-4xl font-bold mb-4">Sketch Your Way to Victory</h1>
              <p className="text-lg mb-8 text-justify">
                Welcome to DrawDash, where creativity meets competition. Given a prompt, you must sketch an image as close as possible to the hidden generated image within a given time. Challenge your drawing skills and see how close you can get!
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <Link href="/play">
                  <Button className="px-12">Play</Button>
                </Link>
                <Link href="#">
                  <Button className="px-12">Create</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="my-12 mx-6 "> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <CustomCard
              title="Play and Earn"
              description="Show off your drawing skills by competing against others. Earn points and rewards based on how close your sketch is to the generated image."
              buttonLabel="Deposit"
            />
            <CustomCard
              title="NFT Marketplace"
              description="Turn your best sketches into NFTs and sell them on our marketplace. Discover and collect unique artworks from other players."
              buttonLabel="Enter Marketplace"
            />
          </div>
        </section>

        <section className="my-12 mx-6 "> 
          <h2 className="text-2xl font-bold mb-4">Games from the Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((_, index) => (
              <ImagePlaceholder key={index} />
            ))}
          </div>
        </section>

        <section className="my-12 mx-6 "> 
          <AccountMenu />
        </section>
      </main>
    </div>
  );
};

export default Home;
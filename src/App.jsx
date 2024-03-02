import {
  Card,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import profilePicture from "@/assets/profilepicture.jpg"
import qwaleLogo from "@/assets/qwale.jpg"
import orionLogo from "@/assets/orion.jpg"
import cogitareLogo from "@/assets/cogitare.jpg"

import instagramLogo from "@/assets/instagram.svg"
import githubLogo from "@/assets/github.svg"
import linkedinLogo from "@/assets/linkedin.svg"
import emailLogo from "@/assets/email.svg"

import spotifyLogo from "@/assets/spotify.svg"
import youtubeLogo from "@/assets/youtube.svg"
import itunesLogo from "@/assets/itunes.svg"
import bandcampLogo from "@/assets/bandcamp.svg"

const skillList = {
  programming: [
    "C++",
    "Javascript",
    "Java",
    "Python",
    "React",
    "Node/Express",
    "C#",
    "C",
    "R",
    "VB.NET",
    "Xojo",
  ],
  databases: [
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Firebase",
    "AWS",
    "Azure"
  ],
  gamedev: [
    "Unity",
    "Godot",
    "GDevelop",
    "GameMaker Studio",
    "Construct",
  ],
  other: [
    "Statistics",
    "Accounting",
    "Engineering",
    "Marketing Campaigns"
  ],
  productivity: [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe Premiere Pro",
    "Soundtrap",
    "FL Studio",
    "Audacity",
    "Figma",
    "Paint.NET",
    "Microsoft Office",
    "GSuite",
  ],
  languages: [
    "English",
    "French",
    "Urdu",
    "Italian",
    "Swedish"
  ]
}

const Personalize = () => {
  return (
    <Card className="flex flex-col w-full h-full justify-center items-center aspect-square">
      <Avatar className="w-20 h-20">
        <AvatarImage src={profilePicture} />
        <AvatarFallback>FJ</AvatarFallback>
      </Avatar>
      <h1 className="text-center mt-1 text-xl">Faraaz Jan</h1>
      <p className="text-center text-md text-muted-foreground mx-10">💻Programmer, ✈Licensed Pilot, 💼Entrepreneur, 🎵Music Artist.</p>
    </Card>
  )
}

const Personal = ({ name, subtitle, description, image, url, color }) => {
  return (
    <a href={url}>
      <Card className={`md:aspect-square p-3 h-full ${color} hover:shadow-xl transition-all`}>
        <div className="grid md:grid-rows-2 h-full">
          <div className="flex md:grid md:grid-cols-2">
            <div className="m-4 md:m-2 lg:m-3">
              <img src={image} className="max-h-16 md:max-h-none h-full aspect-square rounded-2xl" />
            </div>
            <div className="my-auto">
              <h2 className="text-xl">
                {name}
              </h2>
              <h3 className="text-muted-foreground text-md truncate">
                {subtitle}
              </h3>
            </div>
          </div>
          <div className="m-3 text-muted-foreground text-md">
            <p>{description}</p>
          </div>
        </div>
      </Card>
    </a>
  )
}

const ContactItem = ({ contact, username, image, url }) => {
  return (
    <a href={url}>
      <Card className="p-1 h-[5rem] flex flex-col content-center justify-center hover:shadow-xl transition-all">
        <div className="flex flex-row p-2 h-full">
          <div className="my-auto">
            <h2 className="text-md">
              {contact}
            </h2>
            {username && <h3 className="text-muted-foreground text-md">
              {username}
            </h3>}
          </div>
          <div className="mr-0 ml-auto h-full">
            <img src={image} className="h-full aspect-square" />
          </div>
        </div>
      </Card>
    </a>
  )
}

const ContactInfo = () => {
  return(
    <div>
      <h2 className="text-lg my-2 font-semibold">Contact</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
        <ContactItem contact="LinkedIn" username="@faraaz-jan" image={linkedinLogo} url="https://www.linkedin.com/in/faraaz-jan/" />
        <ContactItem contact="GitHub" username="@faqro" image={githubLogo} url="https://github.com/faqro/" />
        <ContactItem contact="Instagram" username="@faraaz.jan" image={instagramLogo} url="https://www.instagram.com/faraaz.jan/" />
        <ContactItem contact="Email" username="me@faraaz.page" image={emailLogo} url="mailto:me@faraaz.page" />
      </div>
    </div>
  )
}

const MusicInfo = () => {
  return(
    <div>
      <h2 className="text-lg my-2 font-semibold">Music</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
        <ContactItem contact="Spotify" image={spotifyLogo} url="https://open.spotify.com/artist/1klulemLJAqc71jssv11ZH" />
        <ContactItem contact="YouTube" image={youtubeLogo} url="https://music.youtube.com/channel/UCVKfTU7ATEiO7LSZiDSrN8A" />
        <ContactItem contact="iTunes" image={itunesLogo} url="https://music.apple.com/us/artist/faraaz-jan/1669735340" />
        <ContactItem contact="Bandcamp" image={bandcampLogo} url="https://faraazjan.bandcamp.com/" />
      </div>
    </div>
  )
}

const Skills = () => {
  return (
    <div className="col-span-2">
      <h2 className="text-lg my-2 font-semibold">Skills</h2>

      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div>
          <h3 className="text-lg my-2 font-semibold">Programming</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.programming.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
            
          <h3 className="text-lg my-2 font-semibold">Databases/Clouds</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.databases.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
            
          <h3 className="text-lg my-2 font-semibold">Productivity/Creativity</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.productivity.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
        </div>
          
        <div>
          <h3 className="text-lg my-2 font-semibold">Game Development</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.gamedev.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
            
          <h3 className="text-lg my-2 font-semibold">Languages</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.languages.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
            
          <h3 className="text-lg my-2 font-semibold">Other</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.other.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Navbar = () => {
  return(
    <div className="fixed w-full h-20 border-b flex justify-center px-10 bg-white z-10">
      <div className="max-w-[70rem] w-full flex justify-start content-center my-auto">
        <Avatar className="w-10 h-10">
          <AvatarImage src={profilePicture} />
          <AvatarFallback>FJ</AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-semibold my-auto mx-2">Faraaz Jan</h1>
      </div>
    </div>
  )
}

const Footer = () => {
  return(
    <div className="p-2">
      <p className="text-md text-muted-foreground">Copyright © 2024 Faraaz Jan</p>
    </div>
  )
}

const Highlights = () => {
  return(
    <div className="grid sm:grid-cols-2 gap-4">
      <Personal name="Qwale" subtitle="qwale.ca" color="bg-theme-purple" description="SaaS suite development" image={qwaleLogo} url="https://qwale.ca" />
      <Personal name="Cogitare" subtitle="cogitare.io" color="bg-theme-green" description="AI-powered grammar correction" image={cogitareLogo} url="https://cogitare.io" />
      <Personal name="Orion Studios" subtitle="orionstudio.ca" color="bg-theme-blue" description="Indie game publishing" image={orionLogo} url="https://orionstudio.ca" />
    </div>
  )
}

const App = () => {
  return (
    <>
      <Navbar/>
      <div className="bg-secondary w-full py-48 px-8">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 max-w-[70rem] mx-auto">
          <Personalize/>
          <Highlights />
          <ContactInfo />
          <MusicInfo />
          <Skills />
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App

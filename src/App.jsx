import {
  Card,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import profilePicture from "@/assets/profilepicture.jpg"
import qwaleLogo from "@/assets/qwale.jpg"
import qwalecodeLogo from "@/assets/qwalecode.jpg"
import uscorLogo from "@/assets/uscor.jpg"
import kogitsioLogo from "@/assets/kogit.jpg"

import quentoLogo from "@/assets/xp/quento.jpg"
import shabodiLogo from "@/assets/xp/shabodi.jpg"
import orionLogo from "@/assets/xp/orion.jpg"
import vdcLogo from "@/assets/xp/vdc.jpg"
import awsLogo from "@/assets/xp/aws.jpg"

import instagramLogo from "@/assets/instagram.svg"
import githubLogo from "@/assets/github.svg"
import linkedinLogo from "@/assets/linkedin.svg"
import emailLogo from "@/assets/email.svg"

const skillList = {
  programming: [
    "C++",
    "Javascript/Typescript",
    "Java",
    "Python",
    "React",
    "Node/Express",
    "C#",
    "C",
    "R",
    "VB.NET",
    "Xojo",
    "Android Studio",
    "Xcode",
    "HTML/CSS",
    "Qiskit",
    "Haskell",
    "Django",
    "Qt Framework"
  ],
  databases: [
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Firebase",
    "LanceDB",
    "SPARQL RDF",
    "Cassandra"
  ],
  network: [
    "GCP",
    "AWS",
    "Azure",
    "fly.io",
    "Render",
    "Git",
    "Docker",
    "Kubernetes",
    "Proxmox"
  ],
  ai: [
    "Large Language Models",
    "Machine Learning",
    "Retrieval-Augmented Generation",
    "OpenAI API",
    "embedJS"
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
    "Marketing Campaigns",
    "Linux Development",
    "Network Virtualization"
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
    "Jira",
    "Confluence",
    "LucidChart"
  ],
  languages: [
    "English",
    "French",
    "Urdu",
    "Japanese"
  ]
}

const experienceList = [
  {
    company: "Amazon Web Services",
    role: "Software Developer Engineer Intern",
    date: "May 2026-",
    location: "Austin, Texas",
    image: awsLogo,
    description: "",
    current: true
  },
  {
    company: "Verdance Development Corporation",
    role: "Software Developer Intern",
    date: "Apr 2025-Mar 2026",
    location: "Ottawa, Canada",
    image: vdcLogo,
    description: "Developed web apps for housing developer clients. Designed financial budgeting software focused on real estate development. Designed industry-targetted Project Management software. Developed a full-stack Azure-hosted full-stack web application using React.js+Express."
  },
  {
    company: "Orion Studios Interactive",
    role: "Game Developer",
    date: "Jun 2021-Jul 2024",
    location: "Ottawa, Canada",
    image: orionLogo,
    description: "Developed and built a business for software development and game publishing. Managed accounting, legal registration, and affairs of the company. Ran marketing campaigns and detailed company’s finance."
  },
  {
    company: "Shabodi",
    role: "DevOps/Virtualization Intern",
    date: "Jul 2023-Sep 2023",
    location: "Mississauga, Canada",
    image: shabodiLogo,
    description: "Lead research efforts into server software and bare-metal virtualization. Spearheaded server-side software migration project from VMware ESXi to Proxmox. Enhanced computing capabilities and eliminated unnecessary software licensing with open-source alternatives."
  },
  {
    company: "Quento",
    role: "Web Application Developer Intern",
    date: "Sep 2020-Dec 2020",
    location: "Ottawa, Canada",
    image: quentoLogo,
    description: "Developed a Progressive Web App for the company’s e-learning and note-taking service. Packaged the PWA as a near-native app for Android, iOS, and Microsoft UWP platforms."
  },
]

const educationList = [
  {
    company: "Carleton University",
    role: "Hon. BCS",
    date: "Sep 2024-Present",
    location: "Ottawa, Canada",
    current: true
  },
  {
    company: "University of West Georgia",
    role: "Transient",
    date: "Jan 2024-Mar 2024",
    location: "Carrollton, Georgia",
  },
  {
    company: "University of Helsinki",
    role: "Open University",
    date: "Oct 2023-Mar 2024",
    location: "Helsinki, Finland",
  },
  {
    company: "The University of British Columbia",
    role: "BSc (transferred)",
    date: "Sep 2023-Apr 2024",
    location: "Vancouver, Canada",
  },
  {
    company: "Lisgar Collegiate Institute",
    role: "OSSD",
    date: "Sep 2019-Jun 2023",
    location: "Ottawa, Canada",
  },
]

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
    <div className="col-span-2">
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
            
          <h3 className="text-lg my-2 font-semibold">Databases</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.databases.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
            
          <h3 className="text-lg my-2 font-semibold">Cloud Tools</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.network.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
            
          <h3 className="text-lg my-2 font-semibold">Productivity/Creativity</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.productivity.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>
        </div>
          
        <div>
          <h3 className="text-lg my-2 font-semibold">Artificial Intelligence</h3>
          <div className="flex gap-1 flex-wrap">  
            {skillList.ai.map((s, i) => (<Badge key={i}>{s}</Badge>))}
          </div>

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

const Experience = ({list, title}) => {
  return (
    <div className="col-span-2">
      <h2 className="text-lg my-2 font-semibold">{title}</h2>

      <div className="flex flex-col gap-3">
        {list.map((e, i) => (
          <Card key={i} className="p-3 flex flex-col content-center justify-center gap-1 shadow-sm" >
            
            <div className="flex flex-row gap-3">
              {e.image? <img src={e.image} className="size-12 aspect-square rounded-md" /> : null}
              <div className="flex flex-col w-full">
                <div className="flex flex-col md:flex-row">
                  <h3 className="text-md font-semibold my-auto">{e.company} - {e.role}{e.current?<Badge className="my-auto mx-1" variant="outline">Current</Badge>:null}</h3>
                  <h4 className="text-muted-foreground md:text-foreground text-sm md:text-md font-semibold my-auto md:mr-0 md:ml-auto">{e.date}</h4>
                </div>

                <h4 className="text-muted-foreground font-semibold text-sm" >{e.location}</h4>
              </div>
            </div>

            <p className="text-muted-foreground text-md">{e.description}</p>
          </Card>
        ))}
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
    <div className="grid sm:grid-cols-2 grid-rows-2 gap-4">
      <Personal name="QwaleCode" subtitle="github.com" color="bg-theme-gray" description="Lightweight collaborative AI-integrated code editor" image={qwalecodeLogo} url="https://github.com/faqro/qwale-code" />
      <Personal name="Kogitsio" subtitle="kogits.io" color="bg-theme-gray" description="AI search asssitant" image={kogitsioLogo} url="https://dev.kogits.io" />
      <Personal name="Qwale" subtitle="qwale.ca" color="bg-theme-gray" description="SaaS suite development" image={qwaleLogo} url="https://qwale.ca" />
      <Personal name="Uscor Esolang" subtitle="github.com" color="bg-theme-gray" description="An esoteric programming language based on C++ and inspired by Lisp" image={uscorLogo} url="https://github.com/faqro/uscor-lang" />
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
          <Experience list={experienceList} title="Experience" />
          <Experience list={educationList} title="Education" />
          <Skills />
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App

import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import FeedCard from "@/components/FeedCard";
import { GoogleLogin } from "@react-oauth/google";


interface SideBarButton {
  title: string,
  icon: React.ReactNode
}
const sideBarMenu : SideBarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle/>
  },
  {
    title: "Explore",
    icon: <BiHash />
  },
  {
    title: "Notification",
    icon: <BsBell/>
  },
  {
    title: "Messages",
    icon: <BsEnvelope/>
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark/>
  },
  {
    title: "Profile",
    icon: <BiUser/>
  },

]


export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 px-52 w-screen h-screen">
        <div className="col-span-3 pt-8 pr-4 w-full">
          <div className="whisprIcon text-4xl hover:bg-gray-800 h-fit w-fit rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="sidebarMenu mt-4 text-xl font-semibold pr-4">
            <ul>
              {sideBarMenu.map(({title,icon})=>(
                <li key={title} className="flex justify-start items-center gap-4  mt-2 hover:bg-gray-800 w-fit px-5 py-2 rounded-full">
                  <span>{icon} </span>
                  <span>{title} </span>
                </li>
              ))}
            </ul>
            <div className="addTweet mt-4">
              <button className="bg-[#1d9bf0] rounded-full w-full p-2 text-lg">Whispr</button>
            </div>
           
          </div>
        </div>
        <div className="col-span-6 border-r-[0.2px] border-l-[0.2px] border-gray-600 h-screen overflow-scroll no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />

          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className="googleSignin p-5 bg-slate-800">
            <h1 className="my-2 text-xl">New to twitter?</h1>
            <GoogleLogin onSuccess={(cred) => {console.log(cred)}}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}

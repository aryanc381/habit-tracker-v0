import { useNavigate } from "react-router";
import {
  HeroColorPanelsRoot,
  HeroColorPanelsContainer,
  HeroColorPanelsContent,
  HeroColorPanelsHeading,
  HeroColorPanelsDescription,
  HeroColorPanelsVisual,
  HeroColorPanelsMobileVisual,
} from "../../ui/hero-color-panel";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div className="absolute mt-[1vw] left-[1.25vw]">
        <p className="cursor-pointer" onClick={() => {navigate('/')}}>Sadhana</p>
      </div>
      <div className="absolute mt-[1vw] right-[1.25vw]">
        <div className="flex gap-[1.5vw] cursor-pointer">
          <p onClick={() => {navigate('/signup')}}>Signup</p>
          <p onClick={() => {navigate('/login')}}>Login</p>
        </div>
      </div>
      <div className="flex w-[110vw] h-[100vh] items-center justify-center">
         <main className="">
          <HeroColorPanelsRoot>
            <HeroColorPanelsContainer>
              <HeroColorPanelsContent>
                <HeroColorPanelsHeading />
                <HeroColorPanelsDescription />
              </HeroColorPanelsContent>
              <HeroColorPanelsVisual />
            </HeroColorPanelsContainer>
            <HeroColorPanelsMobileVisual />
          </HeroColorPanelsRoot>
        </main>
      </div>
    </div>
    
  )
}
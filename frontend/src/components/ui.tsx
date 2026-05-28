import {
  HeroColorPanelsRoot,
  HeroColorPanelsContainer,
  HeroColorPanelsContent,
  HeroColorPanelsHeading,
  HeroColorPanelsDescription,
  HeroColorPanelsActions,
  HeroColorPanelsBadges,
  HeroColorPanelsVisual,
  HeroColorPanelsMobileVisual,
} from "./ui/hero-color-panel";

export default function PageWow() {
  return (
    <main className="min-h-screen">
      <HeroColorPanelsRoot>
        <HeroColorPanelsContainer>
          <HeroColorPanelsContent>
            <HeroColorPanelsHeading />
            <HeroColorPanelsDescription />
            <HeroColorPanelsActions />
            <div
              className="flex justify-center lg:justify-start"
              data-slot="hero-colorpanels-badges-wrap"
            >
              <HeroColorPanelsBadges />
            </div>
          </HeroColorPanelsContent>
          <HeroColorPanelsVisual />
        </HeroColorPanelsContainer>
        <HeroColorPanelsMobileVisual />
      </HeroColorPanelsRoot>
    </main>
  )
}
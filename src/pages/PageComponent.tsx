import { useContext } from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { IPageComponentProps } from "../interfaces/interfaces";
import { ThemeContext } from "../contexts/theme/ThemeContext";



export default function PageComponent(props: IPageComponentProps) {
  
  const { children } = props;
  const { theme } = useContext(ThemeContext);

  return (
   <div className={"flex flex-col min-h-screen w-screen " + theme.colors.text} style={{ backgroundColor: theme.colors.background }}>
      <Navbar />
      <main className="">
        <div style={{ backgroundColor: 'transparent' }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Banner from "@/components/Banner";
import Product from "./product/page";

export default function Home() {
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     checkAndRemoveUserData();
  //   }, 60000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <>
      <Banner />
      <Product />
    </>

    // <main className="h-screen flex flex-col gap-3 justify-center items-center">
    //   <SearchInput />
    //   <Button>Default</Button>
    //   <Button size="sm">Small</Button>
    //   <Button size="lg">Large</Button>
    //   <Button size="icon">icon</Button>
    //   <Button variant="destructive" size="sm">
    //     Small
    //   </Button>
    //   <Button variant="ghost" size="sm">
    //     Small
    //   </Button>
    //   <Button variant="outline" size="sm">
    //     Small
    //   </Button>
    //   <Button variant="secondary" size="sm">
    //     Small
    //   </Button>
    // </main>
  );
}

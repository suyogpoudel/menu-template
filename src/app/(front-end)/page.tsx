import MenuCards from "@/components/home/menu-cards";

const HomePage = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-20 py-10 px-15">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-primary">
        MENU
      </h1>

      <MenuCards />
    </div>
  );
};

export default HomePage;

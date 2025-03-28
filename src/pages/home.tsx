import Products from "../components/products/products.component";

interface HomeProps {
  loading: boolean;
}

const Home = (props: HomeProps) => {
  const pageSize = 9;
  return (
    <div className="App">
      <Products loading={props.loading} pageSize={pageSize} />
    </div>
  );
};

export default Home;

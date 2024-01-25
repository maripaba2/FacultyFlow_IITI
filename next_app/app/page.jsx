import Card from '@components/Card_main'
const Home = () =>
 (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Welcome to
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'>Faculty Flow</span>
    </h1>
    <p className='desc text-center'>
    Faculty Flow is a user-friendly blah blah blah
    </p>
    <div className=" flex flex-row ">
    <Card
        title="Travel"
        subtitle="Subtitle 1"
        description="Description 1"
        imageUrl="/images/card1.jpg"
      />
      <Card
        title="Funds"
        subtitle="Subtitle 2"
        description="Description 2"
        imageUrl="/images/card2.jpg"
      />
      <Card
        title="Inventory"
        subtitle="Subtitle 2"
        description="Description 2"
        imageUrl="/images/card2.jpg"
      />
      <Card
        title="Documents"
        subtitle="Subtitle 2"
        description="Description 2"
        imageUrl="/images/card2.jpg"
      />
    </div>
    
  </section>
);

export default Home;
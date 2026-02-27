function TestFilter({ data }) {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.name_eq}</h3>
          <p>{item.brand_eq}</p>
        </div>
      ))}
    </>
  );
}

export default TestFilter;
function Response(props: any) {
  return (
    <>
      <div
        id="ResponseContainer"
        style={
          props.status == "successful"
            ? {
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                color: "#155724",
              }
            : {
                backgroundColor: "#f8d7da",
                border: "1px solid #f5c6cb",
                color: "#721c24",
              }
        }
      >
        <p>{props.message}</p>
      </div>
    </>
  );
}
export default Response;

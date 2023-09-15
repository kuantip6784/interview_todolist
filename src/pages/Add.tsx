import FormTodolist from "components/FormTodolist";

const Add = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex container justify-center">
        <FormTodolist title="Add todo" type={"create"} />
      </div>
    </div>
  );
};

export default Add;

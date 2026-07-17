import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string(),
});

zodResolver(schema);

const TestComponent = () => {
  return (
    <div>
      TestComponent
    </div>
  );
};

export default TestComponent;

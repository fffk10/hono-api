import useWarranties from "./hooks/useWarranties";
import { Button } from "@yamada-ui/react";

export default function Home() {
  const { warranties } = useWarranties();

  return (
    <div>
      <h2>List</h2>
      <Button>Click me!</Button>
      <ul>
        {warranties.map((warranty) => (
          <li key={warranty.id}>{warranty.productName}</li>
        ))}
      </ul>
    </div>
  );
}

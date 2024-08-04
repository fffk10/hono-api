import { useState } from "react";
import useWarranties from "./hooks/useWarranties";

export default function Home() {
  const { warranties } = useWarranties();

  return (
    <div>
      <h2>List</h2>
      <ul>
        {warranties.map((warranty) => (
          <li key={warranty.id}>{warranty.productName}</li>
        ))}
      </ul>
    </div>
  );
}

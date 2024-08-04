import { useEffect, useState } from "react";
import { GetWarrantiesType } from "../../server";
import { hc } from "hono/client";

type UseWarrantiesType = {
  warranties: Warranty[];
  setWarranties: React.Dispatch<React.SetStateAction<Warranty[]>>;
};

export function useWarranties() {
  const [warranties, setWarranties] = useState<Warranty[]>([]);

  const client = hc<GetWarrantiesType>("/");

  const fetchWarranties = async () => {
    console.log("fetchApi");
    const res = await client.api.warranties.$get();
    const data = await res.json();
    setWarranties(data);
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  return { warranties, setWarranties };
}

export default useWarranties;

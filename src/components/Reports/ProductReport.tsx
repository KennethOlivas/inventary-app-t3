import { api } from "@/utils/api";
import { useCallback } from "react";
import Report from "./Report";

const ProductReport = () => {
  const { data, mutateAsync } = api.product.xlsx.useMutation({
    onSuccess: (data) => {
      const mediaType =
        "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

      window.location.href = `${mediaType}${data.file}`;
    },
  });

  const onClick = useCallback(
    async (startDate: Date, endDate: Date) => {
      await mutateAsync({ startDate, endDate });
    },
    [data]
  );

  return <Report onClick={onClick} />;
};

export default ProductReport;

import { api } from "@/utils/api";
import Report from "./Report";

const ProductReport = () => {
  const { mutateAsync } = api.product.xlsx.useMutation({
    onSuccess: (data) => {
      const mediaType =
        "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

      window.location.href = `${mediaType}${data.file}`;
    },
  });

  const onClick = async (startDate: Date, endDate: Date) => {
    await mutateAsync({ startDate, endDate });
  };

  return <Report onClick={onClick} />;
};

export default ProductReport;

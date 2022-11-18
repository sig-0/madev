import { Box } from "@material-ui/core";
import { FC } from "react";
import { IBlockscoutProps } from "./blockscout.types";

const Blockscout: FC<IBlockscoutProps> = () => {

    return <Box height={"100vh"}>
        <iframe src="http://localhost:10001"
        style={{"height":"100%", "width":"100%"}}
        />
    </Box>

}

export default Blockscout;
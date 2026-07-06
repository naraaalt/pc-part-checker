import type { Build } from "../types/Build";

export function calculatePrice(build:Build){

    return(

        (build.cpu?.price??0)+
        (build.motherboard?.price??0)+
        (build.gpu?.price??0)+
        (build.ram?.price??0)+
        (build.storage?.price??0)+
        (build.psu?.price??0) 

    );

}
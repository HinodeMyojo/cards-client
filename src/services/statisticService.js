import api from "@/plugins/axios";

export function getYearStatistic() {
    try{
        return api.get(`statistic/year`)
    } catch (error) {
        console.error(error)   
    }
}
import api from "@/plugins/axios";

export function getYearStatistic(year) {
    try{
        return api.get(`statistic/year?year=${year}`)
    } catch (error) {
        console.error(error)   
    }
}

export function getAvailableYears(){
    try{
        return api.get(`statistic/available-years`)
    } catch (error) {
        console.error(error)   
    }
}
import { json } from "sequelize/types";
import { JWT_SECRET_VALUE } from "../../config/env";
import jwt from "jsonwebtoken"
const { dnasequence } = require('../../config/db');
class OrdersServices {
    
    // dnasequence
    public async dnasequence() {
        try {
            const count_no_mutation = await dnasequence.count({                
                    where: {mutation: 0}
            });
            const count_mutation = await dnasequence.count({                
                    where: {mutation: 1}
            });
            var porcentaje= (count_mutation / (count_no_mutation+count_mutation))*100;
            var intPorcentaje = Math.round( porcentaje );
            return [{
                "count_no_mutation": count_no_mutation,
                "count_mutation": count_mutation,
                "ratio mutation": `${intPorcentaje}%`,
            }];
        }
        catch(error){
            return [{
                success: 'dnasequence has not been sent.',
                error
            }];
        }
    }
    public async senddnasequence(dnasequence_value: any) {
        try {
            const jsonString = JSON.stringify(dnasequence_value);
            const jsonValue = JSON.parse(jsonString);
            console.log(jsonString, jsonValue.dna);
            let valueSequense;
            const lang = await dnasequence.findAll({                
                where: { sequence: jsonString },
            });
            console.log(lang);
            console.log(lang.length);
            if (lang.length > 0){
            console.log('Tiene valores');
            resultMutation = 'VALUE_IN_DB';
            return {
                status: "success",
                resultMutation,
            };
            } else {
            console.log('No contiene datos');
            var mutationCount = 0;
            var resultMutation;
            var valueArray = new Array(6);
            valueArray[0] = new Array(6);
            valueArray[1] = new Array(6);
            valueArray[2] = new Array(6);
            valueArray[3] = new Array(6);
            valueArray[4] = new Array(6);
            valueArray[5] = new Array(6);

            var coordenadasA0 = [[0, 0], [1,1], [2,2],[3,3],[4,4],[5,5]];
            var coordenadasA1 = [[1, 0], [2,1], [3,2],[4,3],[5,4]];
            var coordenadasA2 = [[2, 0], [3,1], [4,2],[5,3]];
            var coordenadasA3 = [[0, 1], [1,2], [2,3],[3,4],[4,5]];
            var coordenadasA4 = [[0, 2], [1,3], [2,4],[3,5]];

            var coordenadasB0 = [[5, 0], [4,1], [3,2],[2,3],[1,4],[0,5]];
            var coordenadasB1 = [[4, 0], [3,1], [2,2],[1,3],[0,4]];
            var coordenadasB2 = [[3, 0], [2,1], [1,2],[0,3]];
            var coordenadasB3 = [[5, 1], [4,2], [3,3],[2,4],[1,5]];
            var coordenadasB4 = [[5, 2], [4,3], [3,4],[2,5]];
            for(let x1=0; x1< jsonValue.dna.length; x1 += 1)
            {
                for(let vl = 0; vl  < jsonValue.dna[x1].length; vl += 1) {
                    valueArray[ x1][vl] = (jsonValue.dna[x1].charAt(vl));
                }
            }
            console.log('Valores en horizontal');
            for(let x1=0; x1< jsonValue.dna.length; x1 += 1)
            {
                let count =0;
                let validatemutation = false;
                for (let vl = 0; vl  < jsonValue.dna.length; vl += 1) {
                    if(x1 == 5) 
                    {
                        if (count == 3 && validatemutation == false) {
                            if (valueArray[x1][vl] == valueArray[x1][vl-1]){
                                count+=1;
                                if(count == 4){
                                    validatemutation = true;
                                }
                            }
                        }
                        else if (valueArray[x1][vl] == valueArray[x1][vl-1] && validatemutation == false) {
                            count+=1;
                            if(count == 4) validatemutation = true;
                        } else  if(validatemutation == false) {
                            count = 0;
                        }
                    } else {
                        if (count == 3 && validatemutation == false) {
                            if (valueArray[x1][vl] == valueArray[x1][vl-1]){
                                count+=1;
                                if(count == 4){
                                    validatemutation = true;
                                }
                            }
                        }
                        else if (valueArray[x1][vl] == valueArray[x1][vl+1] && validatemutation == false) {
                            count+=1;
                            if(count == 4) validatemutation = true;
                        } else  if(validatemutation == false) {
                            count = 0;
                        }
                    }
                }
                if(count== 4){
                    mutationCount += 1;
                }
                else {
                    // console.log(`Valores sin repeticionen horizontal columna ${x1}`, count);
                }
            }
            console.log('Valores en vertical');
            for(let vl =0; vl< jsonValue.dna.length; vl += 1)
            {
                let count =0;
                let validatemutation = false;
                for (let x1 = 0; x1  < jsonValue.dna.length; x1 += 1) {
                    if(x1 == 5) 
                    {
                        if (count == 3 && validatemutation == false) {
                            if (valueArray[x1][vl] == valueArray[x1-1][vl]){count+=1;
                                if(count == 4){
                                    validatemutation = true;
                                }
                            }
                        }
                        else if (valueArray[x1][vl] == valueArray[x1-1][vl] && validatemutation == false) {
                            count+=1;
                            if(count == 4) validatemutation = true;
                        } else  if(validatemutation == false) {
                            count = 0;
                        }
                    } else {
                        if (count == 3 && validatemutation == false) {
                            if (valueArray[x1][vl] == valueArray[x1-1][vl]){
                                count+=1;
                                if(count == 4){
                                    validatemutation = true;
                                }
                            }
                        }
                        else if (valueArray[x1][vl] == valueArray[x1+1][vl] && validatemutation == false) {
                            count+=1;
                            if(count == 4) validatemutation = true;
                        } else  if(validatemutation == false) {
                            count = 0;
                        }
                    }
                }
                if(count== 4){
                    mutationCount += 1;
                }
                else {
                    // console.log(`Valores sin repeticionen vertical columna ${vl}`, count);
                }
            }
            // Valores por oblicuo
            let count11 =0;
            let validatemutation0 = false;
            for(var i =0; i < coordenadasA0.length ; i++) {
                var point = coordenadasA0[i];
                    if(i == 5) 
                    {
                        var point0 = coordenadasA0[i-1];
                        if (count11 == 3 && validatemutation0 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count11+=1;
                                if(count11 == 4){
                                    validatemutation0 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count11+=1;
                            if(count11 == 4) validatemutation0 = true;
                        } else  if(validatemutation0 == false) {
                            count11 = 0;
                        }
                    } else {
                        var point0 = coordenadasA0[i+1];
                        if (count11 == 3 && validatemutation0 == false) {
                            var point1 = coordenadasA0[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                                count11+=1;
                                if(count11 == 4){
                                    validatemutation0 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count11+=1;
                            if(count11 == 4) validatemutation0 = true;
                        } else  if(validatemutation0 == false) {
                            count11 = 0;
                        }
                    }
            }
            if(validatemutation0){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }
            
            let count0 =0;
            let validatemutation1 = false;
            for(var i =0; i < coordenadasA1.length ; i++) {
                var point = coordenadasA1[i];
                    if(i == 4) 
                    {
                        var point0 = coordenadasA1[i-1];
                        if (count0 == 3 && validatemutation1 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count0+=1;
                                if(count0 == 4){
                                    validatemutation1 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count0+=1;
                            if(count0 == 4) validatemutation1 = true;
                        } else  if(validatemutation1 == false) {
                            count0 = 0;
                        }
                    } else {
                        var point0 = coordenadasA1[i+1];
                        if (count0 == 3 && validatemutation1 == false) {
                            var point1 = coordenadasA1[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                            // if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count0+=1;
                                if(count0 == 4){
                                    validatemutation1 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count0+=1;
                            if(count0 == 4) validatemutation1 = true;
                        } else  if(validatemutation1 == false) {
                            count0 = 0;
                        }
                    }
            }
            
            
            if(validatemutation1){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }
            
            let count1 =0;
            let validatemutation2 = false;
            for(var i =0; i < coordenadasA2.length ; i++) {
                var point = coordenadasA2[i];
                    if(i == 3) 
                    {
                        var point0 = coordenadasA2[i-1];
                        if (count1 == 3 && validatemutation2 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count1+=1;
                                if(count1 == 4){
                                    validatemutation2 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count1+=1;
                            if(count1 == 4) validatemutation2 = true;
                        } else  if(validatemutation2 == false) {
                            count1 = 0;
                        }
                    } else {
                        var point0 = coordenadasA2[i+1];
                        if (count1 == 3 && validatemutation2 == false) {
                            var point1 = coordenadasA2[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                            // if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count1+=1;
                                if(count1 == 4){
                                    validatemutation2 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count1+=1;
                            if(count1 == 4) validatemutation2 = true;
                        } else  if(validatemutation2 == false) {
                            count1 = 0;
                        }
                    }
            }
            
            
            if(validatemutation2){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }
            
            let count2 =0;
            let validatemutation3 = false;
            for(var i =0; i < coordenadasA3.length ; i++) {
                var point = coordenadasA3[i];
                    if(i == 4) 
                    {
                        var point0 = coordenadasA3[i-1];
                        if (count2 == 3 && validatemutation3 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count2+=1;
                                if(count2 == 4){
                                    validatemutation3 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count2+=1;
                            if(count2 == 4) validatemutation3 = true;
                        } else  if(validatemutation3 == false) {
                            count2 = 0;
                        }
                    } else {
                        var point0 = coordenadasA3[i+1];
                        if (count2 == 3 && validatemutation3 == false) {
                            var point1 = coordenadasA3[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                            // if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count2+=1;
                                if(count2 == 4){
                                    validatemutation3 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count2+=1;
                            if(count2 == 4) validatemutation3 = true;
                        } else  if(validatemutation3 == false) {
                            count2 = 0;
                        }
                    }
            }

            if(validatemutation3){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }

            let count3 =0;
            let validatemutation4 = false;
            for(var i =0; i < coordenadasA4.length ; i++) {
                var point = coordenadasA4[i];
                    if(i == 3) 
                    {
                        var point0 = coordenadasA4[i-1];
                        if (count3 == 3 && validatemutation4 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count3+=1;
                                if(count3 == 4){
                                    validatemutation4 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation0 == false) {
                            count3+=1;
                            if(count3 == 4) validatemutation4 = true;
                        } else  if(validatemutation4 == false) {
                            count3 = 0;
                        }
                    } else {
                        var point0 = coordenadasA4[i+1];
                        if (count3 == 3 && validatemutation4 == false) {
                            var point1 = coordenadasA4[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                            // if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count3+=1;
                                if(count3 == 4){
                                    validatemutation4 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation4 == false) {
                            count3+=1;
                            if(count3 == 4) validatemutation4 = true;
                        } else  if(validatemutation4 == false) {
                            count3 = 0;
                        }
                    }
            }

            if(validatemutation4){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }



            // sugunda fase
            
            let count4 =0;
            let validatemutation5 = false;
            for(var i =0; i < coordenadasB0.length ; i++) {
                var point = coordenadasB0[i];
                    if(i== 5) 
                    {
                        var point0 = coordenadasB0[i-1];
                        if (count4 == 3 && validatemutation5 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count4+=1;
                                if(count4 == 4){
                                    validatemutation5 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count4+=1;
                            if(count4 == 4) validatemutation5 = true;
                        } else  if(validatemutation5 == false) {
                            count4 = 0;
                        }
                    } else {
                        var point0 = coordenadasB0[i+1];
                        if (count4 == 3 && validatemutation5 == false) {
                            var point1 = coordenadasB0[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                            // if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count4+=1;
                                if(count4 == 4){
                                    validatemutation5 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count4+=1;
                            if(count4 == 4) validatemutation5 = true;
                        } else  if(validatemutation5 == false) {
                            count4 = 0;
                        }
                    }
            }

            if(validatemutation5){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }
            
            let count5 =0;
            let validatemutation6 = false;
            for(var i =0; i < coordenadasB1.length ; i++) {
                var point = coordenadasB1[i];
                    if(i == 4) 
                    {
                        var point0 = coordenadasB1[i-1];
                        if (count5 == 3 && validatemutation6 == false) {
                            var point1 = coordenadasB1[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                                count5+=1;
                                if(count5 == 4){
                                    validatemutation6 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count5+=1;
                            if(count5 == 4) validatemutation6 = true;
                        } else  if(validatemutation6 == false) {
                            count5 = 0;
                        }
                    } else {
                        var point0 = coordenadasB1[i+1];
                        if (count5 == 3 && validatemutation6 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count5+=1;
                                if(count5 == 4){
                                    validatemutation6 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count5+=1;
                            if(count5 == 4) validatemutation6 = true;
                        } else  if(validatemutation6 == false) {
                            count5 = 0;
                        }
                    }
            }

            if(validatemutation6){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }
            
            
            let count6 =0;
            let validatemutation7 = false;
            for(var i =0; i < coordenadasB2.length ; i++) {
                var point = coordenadasB2[i];
                    if(i == 3) 
                    {
                        var point0 = coordenadasB2[i-1];
                        if (count6 == 3 && validatemutation7 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count6+=1;
                                if(count6 == 4){
                                    validatemutation7 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count6+=1;
                            if(count6 == 4) validatemutation7 = true;
                        } else  if(validatemutation7 == false) {
                            count6 = 0;
                        }
                    } else {
                        var point0 = coordenadasB2[i+1];
                        if (count6 == 3 && validatemutation7 == false) {
                            var point1 = coordenadasB2[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                                count6+=1;
                                if(count6 == 4){
                                    validatemutation7 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count6+=1;
                            if(count6 == 4) validatemutation7 = true;
                        } else  if(validatemutation7 == false) {
                            count6 = 0;
                        }
                    }
            }

            if(validatemutation7){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }
            
            let count7 =0;
            let validatemutation8 = false;
            for(var i =0; i < coordenadasB3.length ; i++) {
                var point = coordenadasB3[i];
                    if(i== 4) 
                    {
                        var point0 = coordenadasB3[i-1];
                        if (count7 == 3 && validatemutation8 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count7+=1;
                                if(count7 == 4){
                                    validatemutation8 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count7+=1;
                            if(count7 == 4) validatemutation8 = true;
                        } else  if(validatemutation8 == false) {
                            count7 = 0;
                        }
                    } else {
                        var point0 = coordenadasB3[i+1];
                        if (count7 == 3 && validatemutation8 == false) {
                            var point1 = coordenadasB3[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                                count7+=1;
                                if(count7 == 4){
                                    validatemutation8 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count7+=1;
                            if(count7 == 4) validatemutation8 = true;
                        } else  if(validatemutation8 == false) {
                            count7 = 0;
                        }
                    }
            }

            if(validatemutation8){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }

            let count8 =0;
            let validatemutation9 = false;
            for(var i =0; i < coordenadasB4.length ; i++) {
                var point = coordenadasB4[i];
                    if(i== 3) 
                    {
                        var point0 = coordenadasB4[i-1];
                        if (count8 == 3 && validatemutation9 == false) {
                            if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]]){
                                count8+=1;
                                if(count8 == 4){
                                    validatemutation9 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count8+=1;
                            if(count8 == 4) validatemutation9 = true;
                        } else  if(validatemutation9 == false) {
                            count8 = 0;
                        }
                    } else {
                        var point0 = coordenadasB4[i+1];
                        if (count8 == 3 && validatemutation9 == false) {
                            var point1 = coordenadasB4[i-1];
                            if (valueArray[point[0]][point[1]] == valueArray[point1[0]][point1[1]]){
                                count8+=1;
                                if(count8 == 4){
                                    validatemutation9 = true;
                                }
                            }
                        }
                        else if (valueArray[point[0]][point[1]] == valueArray[point0[0]][point0[1]] && validatemutation5 == false) {
                            count8+=1;
                            if(count8 == 4) validatemutation9 = true;
                        } else  if(validatemutation9 == false) {
                            count8 = 0;
                        }
                    }
            }

            if(validatemutation9){
                mutationCount += 1;
            }
            else {
                // console.log(`Valores sin repeticionen oblicuo columna ${vl}`, count);
            }



            if(mutationCount < 1){
                resultMutation = 'ANY_MUTATION';
                valueSequense = {
                    mutation : false,
                    sequence:  jsonString,
                };
            }
            else{
                resultMutation = 'GOOG_MUTATION';
                valueSequense = {
                    mutation : true,
                    sequence: jsonString,
                };
            }
            console.log(valueSequense)
            const ship = await dnasequence.create(valueSequense);
            return {
                status: "success",
                resultMutation,
                id: ship.id,
            };
            }
        }
        catch(error){
            console.log(error);
            return [{
                success: 'send dnasequence failed',
                error
            }];
        }
    }
    public async token(value:any) {
        try {
            var userData ={
                "email":  value.email
            }
            let token = jwt.sign(userData, JWT_SECRET_VALUE, { expiresIn: '1h'})
            return [{
                "token": token,
            }];
        }
        catch(error){
            return [{
                success: 'dnasequence has not been sent.',
                error
            }];
        }
    }
}
export default new OrdersServices()

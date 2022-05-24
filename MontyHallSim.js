// monty hall problem
class Hall
{
    constructor()
    {
        this.arr = [,,,]
        
        this.arr.fill("Empty")
        this.Generate();
        this.choice = -1
    }
    
    Generate()
    {
        // generate and assign car
        var car = Math.floor(Math.random() * 3);
        this.arr[car] = "Car"
        
        // generate goats on empty elements
        for(var i = 0; i < this.arr.length; i++)
        {
            if(this.arr[i] == "Empty") this.arr[i] = "Goat"
        }
    }
    
    Choose()
    {
        var choice = Math.floor(Math.random() * this.arr.length);
        
        while(this.arr[choice] == "Empty")
        {
            choice = Math.floor(Math.random() * this.arr.length);
        }
        
        this.choice = choice;
    }
    
    Swap()
    {
        for(var a = 0; a < this.arr.length; a++)
        {
            if(this.arr[a] != "Empty" && a != this.choice)
            {
                this.choice = a
                return
            }
        }
    }
    
    RemoveGoat()
    {
        for(var a = 0; a < this.arr.length; a++)
        {
            if(this.arr[a] == "Goat" && a != this.choice)
            {
                this.arr[a] = "Empty"
                return
            }
        }
    }
    
    IsWon()
    {
        if(this.arr[this.choice] == "Car") return true
        
        return false
    }
}

class Simulation
{
    constructor(c)
    {
        this.c = c
        
        this.won = 0;
        this.loss = 0
    }
    
    Simulate()
    {
        for(i = 0; i < this.c; i++)
        {
            
            this.hall = new Hall()
            
            this.SimulatePattern()
            
            if(this.hall.IsWon())
            {
                this.won++
            }
            else
            {
                this.loss++
            }
        }
    }
    
    SimulatePattern() { }
    
    // pattern 1
    // choose and dont swap
    SimPattern1(){ this.hall.Choose() }
    
    // pattern 2
    // chose and swap
    SimPattern2()
    {
        this.hall.Choose()
        this.hall.RemoveGoat()
        this.hall.Swap()
    }
}

function GetAverage(sim)
{
    let sum = 0
    
    sim.forEach((s) => {
       sum += s.won
    });
    
    console.log(sum/sim.length)
}

function Simulate(amount, simulationTimes)
{
    let simulations = []
    
    for(i = 0; i < amount; i++)
    {
        let sim = new Simulation(simulationTimes)
        
        sim.SimulatePattern = sim.SimPattern1;
        // sim.SimulatePattern = sim.SimPattern2;
        
        
        simulations.push(sim)
    }
    
    simulations.forEach((sim, i) => {
        sim.Simulate();
    })
    
    return simulations
}

let sims = Simulate(1000,100)
GetAverage(sims)
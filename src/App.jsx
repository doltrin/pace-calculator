import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Dummy data for recent calculations
const initialRecentCalculations = [
  { id: 1, type: 'Pace', details: '10 km in 00:55:00 -> 05:30 min/km' },
  { id: 2, type: 'Prediction', details: '5 km in 00:25:00 -> Predicted 10k: 00:51:30' },
  { id: 3, type: 'Calories', details: '70kg for 10km -> ~700 kcal' },
];

function App() {
  const [activeTab, setActiveTab] = useState("calculate");
  const [recentCalculations, setRecentCalculations] = useState(initialRecentCalculations);
  const [unitSystem, setUnitSystem] = useState("metric");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-primary">Pace Calculator Pro</h1>
          <p className="text-muted-foreground mt-2">Your complete running calculation toolkit.</p>
        </header>

        <Tabs defaultValue="calculate" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculate">Calculate Pace</TabsTrigger>
            <TabsTrigger value="predict">Predict Finish Time</TabsTrigger>
          </TabsList>

          <TabsContent value="calculate">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Pace</CardTitle>
                <CardDescription>Enter distance and time to find your pace, speed, and estimated calories.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg bg-muted/20">
                    <h3 className="font-semibold mb-4 text-foreground">Distance and Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="distance-calc">Distance (km)</Label>
                        <Input id="distance-calc" placeholder="10" />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <div className="flex gap-2">
                          <Input placeholder="HH" aria-label="Hours" />
                          <Input placeholder="MM" aria-label="Minutes" />
                          <Input placeholder="SS" aria-label="Seconds" />
                        </div>
                      </div>
                    </div>
                </div>
                <div className="p-4 border rounded-lg bg-muted/20">
                    <h3 className="font-semibold mb-4 text-foreground">Estimate Calories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="weight-calories">Your Weight (kg)</Label>
                          <Input id="weight-calories" placeholder="70" />
                      </div>
                       <div className="space-y-2">
                          <Label htmlFor="distance-calories">Distance (km)</Label>
                          <Input id="distance-calories" placeholder="21.1" />
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predict">
            <Card>
              <CardHeader>
                <CardTitle>Predict Finish Time</CardTitle>
                <CardDescription>Enter a recent race result to predict your potential times for other distances.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="race-distance">Race Distance</Label>
                        <Input id="race-distance" placeholder="5" />
                    </div>
                     <div className="space-y-2">
                        <Label>Unit</Label>
                        <RadioGroup defaultValue="metric" value={unitSystem} onValueChange={setUnitSystem} className="flex gap-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="metric" id="metric-option" />
                                <Label htmlFor="metric-option">Metric (km)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="imperial" id="imperial-option" />
                                <Label htmlFor="imperial-option">Imperial (mi)</Label>
                              </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Race Finish Time</Label>
                    <div className="flex gap-2 max-w-sm">
                        <Input placeholder="HH" aria-label="Hours" />
                        <Input placeholder="MM" aria-label="Minutes" />
                        <Input placeholder="SS" aria-label="Seconds" />
                    </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Predict Race Times</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Recent Calculations</CardTitle>
                <CardDescription>Your last few calculations will appear here for quick reference.</CardDescription>
            </CardHeader>
            <CardContent>
                {recentCalculations.length > 0 ? (
                    <ul className="space-y-3">
                        {recentCalculations.map((calc) => (
                            <li key={calc.id} className="flex items-center justify-between p-3 rounded-md bg-muted/40 border">
                                <span className="font-medium text-foreground">{calc.type}:</span>
                                <span className="text-muted-foreground">{calc.details}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-muted-foreground py-4">No calculations yet.</p>
                )}
            </CardContent>
             <CardFooter className="flex justify-end">
                <Button variant="ghost" onClick={() => setRecentCalculations([])}>Clear History</Button>
            </CardFooter>
        </Card>

      </div>
    </div>
  );
}

export default App;
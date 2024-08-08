import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Paw, Star, ArrowRight } from "lucide-react";

const CatBreed = ({ name, description, icon, rating }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {icon}
            {name}
          </span>
          <span className="flex items-center">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <Button variant="link" className="mt-2 p-0">
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", icon: <Cat className="h-5 w-5 text-blue-500" />, rating: 5 },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", icon: <Cat className="h-5 w-5 text-orange-500" />, rating: 4 },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", icon: <Cat className="h-5 w-5 text-gray-500" />, rating: 4 },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality.", icon: <Cat className="h-5 w-5 text-yellow-500" />, rating: 5 },
  ];

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-6 text-center text-purple-800"
        >
          All About Cats <Cat className="inline-block h-12 w-12 text-purple-600" />
        </motion.h1>

        <motion.div
          className="relative mb-8 rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={catImages[currentImageIndex]}
              alt={`Cat ${currentImageIndex + 1}`}
              className="mx-auto object-cover w-full h-[500px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-white text-2xl font-bold">Discover the World of Cats</h2>
            <p className="text-gray-200">Explore different breeds, care tips, and more!</p>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breeds">Breeds</TabsTrigger>
            <TabsTrigger value="care">Care Tips</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl text-purple-700">Cat Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                      Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                      independence, agility, and affectionate nature. With their playful antics and soothing purrs, cats have
                      become beloved companions in millions of households worldwide.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-lg py-2 px-4">
                        <Heart className="h-5 w-5 mr-2" /> Affectionate
                      </Badge>
                      <Badge variant="outline" className="text-lg py-2 px-4">
                        <Paw className="h-5 w-5 mr-2" /> Agile
                      </Badge>
                      <Badge variant="outline" className="text-lg py-2 px-4">
                        <Info className="h-5 w-5 mr-2" /> Independent
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="breeds">
                <h2 className="text-3xl font-semibold mb-6 text-purple-700">Popular Cat Breeds</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catBreeds.map((breed, index) => (
                    <CatBreed key={index} {...breed} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="care">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl text-purple-700">Cat Care Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        "Provide a balanced diet suitable for your cat's age and health",
                        "Ensure fresh water is always available",
                        "Regular grooming to keep their coat healthy",
                        "Schedule regular vet check-ups",
                        "Offer plenty of playtime and mental stimulation"
                      ].map((tip, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Paw className="h-6 w-6 text-purple-500 mr-2 flex-shrink-0 mt-1" />
                          <span className="text-lg">{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

#include <iostream>
#include <string>
using namespace std;

class travelObject{
public:
	string place;
	int howFarAway;
	bool swapped = false;
};

//temporary "distance" finder
int findDistance(int pointA, int pointB){
	int distance = pointA + pointB;
	return distance;
}

void sortThings(travelObject someObj[]){
	travelObject returnObj[5];
	returnObj[0] = someObj[0];


	//array to hold distances
	int distBtwn[5];
	//index 0 is the starting point/root
	
	//compare one object with all the rest
	//Then move onto the next object and do the same thing
	for (int i = 0; i < 5; i++){
		for (int p = (i + 1); p < 5; p++){
			// find the distance here
			distBtwn[p] = findDistance(someObj[i].howFarAway, someObj[p].howFarAway);
		}		
		//compare the distances here
		bool firstTime = true;
		for (int k = (i + 1); k < 5; k++){
			if (firstTime == true){
				firstTime = false;
				returnObj[i] = someObj[k];
				//pop someObj[k] off the stack
				someObj[k].howFarAway = 999;
			}
			else if (returnObj[i].howFarAway < distBtwn[k]){
				//push returnObj back onto someObj stack
				travelObject temp = returnObj[i];
				returnObj[i] = someObj[k];
				someObj[k] = temp;
				//pop someObj[k] off the stack
			}

		}
		firstTime = true;
	}


	//print
	for (int i = 0; i < 5; i++){
		cout << returnObj[i].place << endl;
	}
}




int main(){
	travelObject myObject[5];
	myObject[0].place = "Place0";
	myObject[0].howFarAway = 0;

	myObject[1].place = "Place1";
	myObject[1].howFarAway = 100;

	myObject[2].place = "Place2";
	myObject[2].howFarAway = 5;

	myObject[3].place = "Place3";
	myObject[3].howFarAway = 50;

	myObject[4].place = "Place4";
	myObject[4].howFarAway = 80;

	
	sortThings(myObject);
	system("PAUSE");
}
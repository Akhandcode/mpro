#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int m,x;
    cout << "Enter the size of the array: ";
    cin >> m;
    vector<int> A(m);
    cout << "Enter the elements:\n";
    for (int i = 0; i < m; i++) {
        cin >> A[i];
    }
   int max=0;
    for(int i=0 ;i<m ; i++)
    {
     if(A[i]>max)
    {
        max=A[i];
        i+=1;
        x=max;
    }
    }
    int sum = 0;
    for (int i = 0; i < m; i++) {
        sum += A[i];
    }
    int total = x * (x + 1) / 2;
    int ans = total - sum;

    cout<< ans << endl;
    return 0;
}

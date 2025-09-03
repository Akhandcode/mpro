#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n,i;
    cout << "Enter the size of the array: ";
    cin >> n;

    cout << "Enter the elements of the array: ";
    vector<int> arr(n-1);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    int num,x;
    cout << "Enter the number: ";
    cin >> num;
    cout << "Enter the index: ";
    cin >> x;

    for(int j = n; j > x; j--) {
        arr[j] = arr[j-1];
    }
    arr[x] = num;
    n=n+1;
    
    for(int i = 0; i<=arr.size()-1;i++)
    {
        cout << arr[i] << " ";
    }
    return 0;
}
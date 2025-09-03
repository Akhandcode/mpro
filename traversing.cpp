#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cout << "Enter the size of the array: ";
    cin >> n;

    cout << "Enter the elements of the array: ";
    vector<int> arr(n);

    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    cout << "The array is: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
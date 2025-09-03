#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;
void traverseArray(vector<int>&X)
{
    for(int i = 0;i<X.size();i++)
    {
        cout<<X[i]<<" ";
    }
}
/********************/
void mergeArray(vector<int>& A,vector<int>& B,int m,int n,vector<int>& C)
{
int i=0 , j=0;
while(i<m && j<n)
{
    if( A[i]>B[j])
    {
        C.push_back(A[i]);
        i=i+1;
    }
   else
    {
        C.push_back(B[j]);
        j=j+1;
    }
    while(i<m)
    {
        C.push_back(A[i]);
        i++;
    }
    while(j<n)
    {
        C.push_back(B[j]);
        j++;
    }
}
}
/********************/

int main() {
    int m,n;
    cout<<"Enter the size of the m";
    cin>>m;
    vector<int> A(m);
    for(int i=0 ;i<m ; i++)
    {
    cin>>A[i];
    }
    cout<<"Enter the size of the n";
    cin>>n;
    vector<int> B(n);
    for(int j=0 ;j<n ; j++)
    {
    cin>>B[j];
    }
    vector<int>C;
    mergeArray(A,B,m,n,C);
    traverseArray(C);
    return 0;
    
    
}